(function () {
    'use strict!'
    if (!Array.from) {
        Array.from = function (object) {
            return [].slice.call(object);
        }
    }
    const designDeviceComponent = {
        name: 'designDevice',
        data() {
            return {

            }
        },
        render(createElement) {
            return createElement("canvas", {
                attr: {
                    id: "de"
                }
            })
        },
        mounted() {
            console.log("渲染完成")
        }
    }
    if (window && (window.Vue)) {
        Vue.component('designDevice', designDeviceComponent)
    }
})()