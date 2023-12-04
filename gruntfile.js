module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        less: {
            development: {
                files: {
                    'dev/styles/main.css': 'src/styles/main.less'
                }
            },
            production: {
                options: {
                    compress: true
                },
                files: {
                    'dist/styles/main.min.css': 'src/styles/main.less'
                }
            }
        },
        watch: {
            less: {
                files: ['src/styles/**/*.less'],
                tasks: ['less:development']
            },
            html: {
                files: ['src/index.html'],
                tasks: ['replace:dev']
            }
        },
        replace: {
            dev: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_CSS',
                            replacement: './styles/main.css'
                        },
                        {
                            match: 'ENDERECO_JS',
                            replacement: '../src/scripts/main.js'
                        }
                    ]
                },
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['src/index.html'],
                    dest: 'dev/'
                }]
            },
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_CSS',
                            replacement: './styles/main.min.css'
                        },
                        {
                            match: 'ENDERECO_JS',
                            replacement: './scripts/main.min.js'
                        }
                    ]
                },
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['prebuild/index.html'],
                    dest: 'dist/'
                }]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                },
                files: {
                    'prebuild/index.html': 'src/index.html'
                }
            }
        },
        clean: ['prebuild'],
        uglify: {
            target: {
                files: {
                    'dist/scripts/main.min.js': 'src/scripts/main.js'
                }
            }
        }
    })

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['watch'])
    grunt.registerTask('build', ['less:production', 'htmlmin:dist', 'replace:dist', 'clean', 'uglify'])
}

//Basicamente o que o código aqui está fazendo é: setar duas linhas de ações, uma com ">npm run grunt" (que é a tarefa default) e
//outra com ">npm run build". A primeira rodará watch que, por sua vez, a partir de alterações nos arquivos listados (.less e 
//index.html fonte) criará as pastas solicitadas e/ou atualizará os arquivos das mesmas, sendo que index.html, depois de criado
//e/ou atualizado terá um replace para a folha de estilo do próprio diretório em "dev". Rodando a segunda tarefa, acontece basicamente 
//o mesmo, porém, htmlmin fará a minificação do index.html fonte, que irá para "dist" e mandará esse arquivo para uma pasta temporaria,
//a "prebuild", só então, será esse o arquivo puxado para ser feito o replace do diretório da folha de estilo e então enviado o
//index.html final (minificado) para "dist", depois, "prebuild" será apagada pela tarefa clean. Dessa maneira teremos dois arquivos 
//.css e dois index.html, um comum e um minificado de cada, e cada index.html puxará o próprio main.css ou main.min.css graças ao 
//replace que substituiu @@ENDERECO_CSS pelos diretórios dentro de cada index.html e enviou cada arquivo para seu devido diretório. 
//Com relação a minificação do .js ocorre algo bem parecido, mas aqui o uglify, que é plug-in usado para isso, é executado após o
//replace de @@ENDERECO_JS