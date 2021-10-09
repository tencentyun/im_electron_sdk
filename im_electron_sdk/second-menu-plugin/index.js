// const pluginFun = require('./src/plugin')

const typedocInstance = require("typedoc");

// const pluginJS = require('./src/plugin');
function load(app) {
    
    if (app.converter.hasComponent("23")) {
		return;
	}

    // 增加命令行
    app.options.addDeclaration({
        name: "myOption",
        help: "Displayed when --help is passed",
        type: typedocInstance.ParameterType.String, // The default
        defaultValue: "", // The default
    });

    app.converter.on(typedocInstance.Converter.EVENT_RESOLVE, (context,reflection,node) => {
        // console.log(app.options.getValue("myOption") )
        if (app.options.getValue("myOption") === "something") {
            // ...
            console.log("好耶好耶")
        }
    });
    app.converter.on(typedocInstance.Converter.EVENT_RESOLVE_BEGIN,onResolveBegin.bind(void 0))
    app.renderer.once(typedocInstance.RendererEvent.BEGIN, onRenderStart);
    app.renderer.once(typedocInstance.RendererEvent.END, onRenderFinished);
    app.renderer.on(typedocInstance.PageEvent.BEGIN, onPageFinished)
    app.renderer.on(typedocInstance.PageEvent.END, onPageStart)
}


const arr = [];
function onResolveBegin(context) {
    // const reflections = context.project.reflections;
    let _a, _b;
    const modules = ((_a = context.project.children) !== null && _a !== void 0 ? _a : []).filter((c) => c.kindOf(typedocInstance.ReflectionKind.Module));
    
    if (modules.length > 0) {
        const projectChildArr = [];
        for (const mod of modules) {
            const reflections = (_b = mod.children) !== null && _b !== void 0 ? _b : [];
            for (const ref of reflections) {
                // Drop aliases
                if (!ref.kindOf(typedocInstance.ReflectionKind.Reference)) {
                    ref.parent = context.project;
                    projectChildArr.push(ref);
                }
            }
            console.log(mod.name)
            if(mod.name !== "inreface(各个接口泛型)")
           {
               // delete mod.children;
               // context.project.removeReflection(mod);
        }
        }
    }
}

// onRenderStart只会执行一次
function onRenderStart(context) {
    
    const reflections = context.project.reflections;

    console.log("onRenderStarted")
    for (const key in reflections) {
        const ref = reflections[key];

        if(ref.kindOf(typedocInstance.ReflectionKind.Class) || ref.kindOf(typedocInstance.ReflectionKind.Method)){
            arr.push(reflections[key]);
        }
    }
}

function onRenderFinished(context) {
    const reflections = context.project.reflections;
    
   console.log("onRenderFinished")
}


// page则会执行很多次
function onPageStart(page) {
        let model = page.model;
        const childrenArr = [];
        if(page.model.name === "im_electron_sdk文档"){
        for(const key in model.children){
            
            const item = model.children[key];
           if(!item.kindOf(typedocInstance.ReflectionKind.Class) && !item.kindOf(typedocInstance.ReflectionKind.Method)){
            childrenArr.push(item);
           }
        }
        // console.log("model.children",model.children);
        model.children = []
        model.children.push(...childrenArr,...arr)
        
       console.log("im_electron_sdk文档")
    
    }
}

function onPageFinished(page) {
    console.log("onPageFinished")
}




exports.load = load;