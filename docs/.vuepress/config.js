module.exports = {
    title:"Xxk'notes",
    description:'study notes',
    port:9999,
    base: "/notes",
    themeConfig:{
        nav:[
            {text:'主页',link:'/'},
            {text:'笔记',
                items:[
                    {text:'Vue',link:'/Vue/'},
                    {text:'javascript',link:'/js/'},
                ]
            },
        ],
        sidebar: {
            '/Vue/':[
                '',
                '01-ES6补充',
                '02-HelloVue',
                '03-插值操作',
                '04-动态绑定属性',
                // '05-计算属性与侦听器',
                // '06-事件监听',
                // '07-条件判断',
                // '08-遍历循环',
                // '09-综合练习',
                // '10-v-model',
                // '11-组件化开发',
                // '12-组件化高级',
                // '13-vue实例的生命周期',
                // '14-前端模块化',
                // '15-webpack',
            ],
            '/js/':[
                '',
                'javascript',
            ],
        }
    }
}