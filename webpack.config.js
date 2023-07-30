const webpack = require('webpack');
const TerserWebpackPlugin = require('terser-webpack-plugin') //webpack 打包最小化工具
const HtmlWebpackPlugin = require('html-webpack-plugin');  //webpack 打包時使用html 模板生成
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //webpack 打包時清除資料


const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin');  //webpack 客製化打包進度條樣式
const WebpackBundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; //webpack 打包詳細資訊訊

const CopyWebpackPlugin = require('copy-webpack-plugin')

const path = require('path');


const config = (env, argv) => {
     /** 判斷執行環境是否為 development 或 production */
    const isDev = argv.mode == 'development';

    /** 打包壓縮最佳化設定 */
    const optimization = {
        minimize:true,
        flagIncludedChunks:true,
        removeEmptyChunks:true,
        splitChunks:{
            chunks:'all',
            cacheGroups:{
                reactVendor:{
                    test:/[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                    name:'reactVendor',
                },
                antdVendor:{
                    test:/[\\/]node_modules[\\/](antd|@ant-design)[\\/]/,
                    name:'antdVendor'
                }

            }
        },
        minimizer:[
            new TerserWebpackPlugin({
                extractComments: true,
                parallel: true,
                terserOptions: {
                    compress: {
                        drop_console: true,
                    },
                }
            })
        ]
    }

    /** 解析模組的設定 */
    const module = {
        rules:[
            {
                test:/\.(js|jsx)$/,
                exclude:/node_modules/,
                use:{
                    loader: 'babel-loader',
                    options:{
                        presets:['@babel/preset-react', '@babel/preset-env']
                    }
                }
            },
            {
                test:/\.(css|scss|sass)\$/,
                use:[
                    {
                        loader:'style-loader'
                    },
                    {
                        loader:'css-loader'
                    },
                    {
                        loader:'postcss-loader',
                        options:{
                            plugins:()=> [require('autoprefixer')]
                        }
                    },
                    {
                        loader:'sass-loader'
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2|mp3|wav|csv|xlsx)$/,
                loader: 'url-loader',
                options: {
                    limit: 30000,
                    name: 'assets/[name].[ext]',
                },
            },
        ]
    }

    /** webpack-dev-server的設定 */
    const devServer = {
        static:{
            directory: path.resolve(__dirname, 'dist') 
        },
        proxy:{         
            '/api/Record/**':{
                target:'http://nexifytw.mynetgear.com:45000/',
                pathRewrite: { '^/': '' },           
                changeOrigin: true,                     
                secure: false,                          
                logLevel: 'debug',
            },
            
        },
        port:8787,      
        compress: true, 
        open: true,     
        hot: true       
    }

    /** webpack外掛組件的設定 */
    const plugins = [
        /** 用來生成 webpack 內可掌握的環境狀態的變數  */
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(argv.mode),
                __VERSION__: JSON.stringify(require('./package.json').version),
            },
        }),

        /** webpack 客製化打包進度條樣式 */
        new ProgressBarWebpackPlugin(),

        /** webpack 打包時清除資料  */
        new CleanWebpackPlugin(),

        /** webpack 打包時使用html 模板生成 */
        new HtmlWebpackPlugin({
            title:'js-react-mobx-webpack-practice',
            template:'./src/index.ejs',              
            filename:'./index.html',                 
            inject:true,                             
            favicons:'favicon',                      
            hash:true,                               
            cache:true,                              
            minify:{                                 
                collapseWhitespace: true,            
                removeComments: true,                
                removeRedundantAttributes: true,     
                removeScriptTypeAttributes: true,    
                removeStyleLinkTypeAttributes: true, 
            }
        }),

        new CopyWebpackPlugin({
            patterns:[
                { from: './public/favicon/', to: './favicon/'}
            ]
        })
    ]

    /** webpack 匯入解析設定 */
    const resolve = {
        modules:[path.resolve(__dirname, 'src'), 'node_modules'], 
        alias:{
            config:path.resolve(__dirname, './src/config/'),
            api:path.resolve(__dirname, './src/actions/api.js')   
        },
        extensions: ['.js', '.css', '.scss', '.json'],  
        symlinks:false  
    }

    if(process.env.ANALYZE){
        plugins.push(new WebpackBundleAnalyzerPlugin());
    }
    
    return {
        /** 環境是development或production */
        mode:isDev ? 'development' : 'production',

        /** 設定進入點 */
        entry:{
            main:['@babel/polyfill', path.resolve(__dirname, './src/main.js')] //從哪裡開始打包
        },

        /** 設定打包出來後的目錄 */
        output:{
            filename:'[name]-[hash:4].js',  //要打包後的檔名
            path: path.resolve(__dirname, 'dist')   //要打包到哪裡
        },

        /** 轉發除錯 */
        infrastructureLogging:{
            debug: [name => name.includes('webpack-dev-server')],
        },

        /** 打包壓縮最佳化 */
        optimization,

        /** 生成SourceMap */
        devtool: isDev && 'eval-cheap-module-source-map',
        
        /** 解析模組, 看到甚麼附檔名,用甚麼方式處裡 */
        module,

        /** webpack-dev-server */
        devServer,

        /** webpack外掛套件 */
        plugins,

        /** webpack 匯入解析 */
        resolve,
    }
}

module.exports = config;