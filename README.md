# 学习并且进阶angular ^2


## 起步

### 建立项目

执行 `ng new your_project_name` 来创建一个项目

```shell
 ng new angularLearn
  create angularLearn/README.md (1103 bytes)
  create angularLearn/.angular-cli.json (1131 bytes)
  create angularLearn/.editorconfig (245 bytes)
  create angularLearn/.gitignore (516 bytes)
  create angularLearn/src/assets/.gitkeep (0 bytes)
  create angularLearn/src/environments/environment.prod.ts (51 bytes)
  create angularLearn/src/environments/environment.ts (387 bytes)
  create angularLearn/src/favicon.ico (5430 bytes)
  create angularLearn/src/index.html (299 bytes)
  create angularLearn/src/main.ts (370 bytes)
  create angularLearn/src/polyfills.ts (2480 bytes)
  create angularLearn/src/styles.css (80 bytes)
  create angularLearn/src/test.ts (1085 bytes)
  create angularLearn/src/tsconfig.app.json (211 bytes)
  create angularLearn/src/tsconfig.spec.json (304 bytes)
  create angularLearn/src/typings.d.ts (104 bytes)
  create angularLearn/e2e/app.e2e-spec.ts (295 bytes)
  create angularLearn/e2e/app.po.ts (208 bytes)
  create angularLearn/e2e/tsconfig.e2e.json (235 bytes)
  create angularLearn/karma.conf.js (923 bytes)
  create angularLearn/package.json (1318 bytes)
  create angularLearn/protractor.conf.js (722 bytes)
  create angularLearn/tsconfig.json (363 bytes)
  create angularLearn/tslint.json (3040 bytes)
  create angularLearn/src/app/app.module.ts (314 bytes)
  create angularLearn/src/app/app.component.css (0 bytes)
  create angularLearn/src/app/app.component.html (1075 bytes)
  create angularLearn/src/app/app.component.spec.ts (986 bytes)
  create angularLearn/src/app/app.component.ts (207 bytes)
You can `ng set --global packageManager=cnpm`.
Installing packages for tooling via npm.
Installed packages for tooling via npm.
Successfully initialized git.
Project 'angularLearn' successfully created.

```


### 启动项目

执行 `ng serve` 来启动开发服务器. 浏览器打开 `http://localhost:4200/`. 项目会自动热更新变更的代码。


### 章节列表

##### 1.组件
###### 1.1组件传值
###### 1.2组件通信
###### 1.3双向绑定
###### 1.4事件传递

#### 1.1组件传值
先通过angular-cli创建两个组件 girl 和 boy

``` 
ng g component boy
ng g component girl

```
目录结构为

```
--boy
	boy.component.ts
	boy.component.html
	boy.component.spec.ts
	boy.component.css
--girl 
	girl.component.css
	girl.component.html
	girl.component.spec.ts
	girl.component.ts
```

组件如下（boy）

```js
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-boy',
  templateUrl: './boy.component.html',
  styleUrls: ['./boy.component.css']
})
export class BoyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
```
girl的组件 也是一样的。现在我们要由我们的男孩给女孩子一个礼物。

首先girl 应该有一个接收参数 
在girl 组件中添加如下代码

```
@Input() gift: string
```

修改我们的页面模板 gril.component.html

```
<p>
  I am girl , i got the gift {{gift}} 
</p>

```
注意：{{}} 双花括号 为页面模板语法，内部传递组件类变量

这样的话 我们就可以看到girl 有什么礼物了

现在回到我们的boy组件。这里忘了说明一点。在我们使用angular-cli的时候。cli工具自动帮我们处理了组件依赖的添加。回到我们的app.module.ts

```
  declarations: [
    AppComponent, BoyComponent, GirlComponent
  ],
```
可以看到declartions已经涵盖了这两个组件。

这次回到我们的boy组件。我们需要给boy 的页面  boy.component.html 添加一个女孩子。

boy.component.html

```
<p>
  i am boy
</p>

<app-girl [gift]="'电动棒'">

</app-girl>

```
给她个电动棒作为礼物。

然后看看效果

页面显示效果如下

```
i am boy

I am girl , i got the gift 电动棒
```

光一样礼物还不行。得换着来。现在通过输入框双向绑定来实现修改礼物

在boy.component.ts中 添加一个变量

```
  gift = '电动棒'
```

在boy.componnet.html中添加一行

```
<input [(ngModel)]="gift">
```

这样在输入输出的时候就能自己修改变量了。

#### 1.2组件通信

女孩子收到礼物后 肯定要做出些反应

在girl.component.html中添加一个按钮。来反馈 ，并且修改girl.component.ts 如下

html:

```html
<p>
  I am girl , i got the gift {{gift}}
</p>

<button (click)="reply()">回复他</button>

```

ts:

```
@Component({
  selector: 'app-girl',
  templateUrl: './girl.component.html',
  styleUrls: ['./girl.component.css']
})
export class GirlComponent implements OnInit {

  constructor() {
  }

  @Input() gift: string

  @Output() message: EventEmitter<string> = new EventEmitter()

  ngOnInit() {
  }

  reply() {
    let message = '喜欢'
    if (this.gift != '跳蛋') {
      message = '不喜欢'
    }
    this.message.emit(message)
  }
}
```

现在组件内部已经能进行对外emit了。但是在boy中还缺少一个定义。boy也需要接受reply的函数。
修改boy.component.html中的girl组件

```
<app-girl (message)="get_message($event)" [gift]="gift">

</app-girl>

```

注：此处函数反馈值的接收参数必须要定义为$event

定义方法 boy.component.ts

```
  get_message(message: string) {
    alert(message)
  }

```

此时点击回复他按钮。就会弹出不喜欢。

#### 1.3 双向绑定

此章节主要说的是组件的自定义双向绑定。非传统的双向绑定

实现目的。girl 能够自己改变 boy 中的 礼物。


这里我们先要注入一个 NG_VALUE_ACCESSOR
并且要使用现有的component

```js
@Component({
  selector: 'app-girl',
  templateUrl: './girl.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GirlComponent), 
      multi: true
    }
  ],
  styleUrls: ['./girl.component.css']
})
```

关于 NG_VALUE_ACCESSOR 以及注入参数的解释。官方文档已经解释的很详细。各位搜一下即可。

这里我大致说一下

provide:提供者 
useExisting: 相当于一个alias。 当注入类不存在实例 即创建一个新的,如果存在,即用同一个实例
multi:     允许多个提供者使用一个一个共同的令牌

然后再继承一些方法。

```js
//写入值
  writeValue(obj: any): void {
    this.gift = obj
  }


  onChange: any = Function.prototype;
  onTouched: any = Function.prototype;


  registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

```

  registerOnChange 和   registerOnTouched 皆为事件回调绑定
  
  现在我们继续在 girl.component.ts中添加 改变礼物方法
  
  ```
  change_gift() {
    this.gift = '洗刷刷'
    this.onChange(this.gift)
  }
  ```
  
  
  修改girl.component.html
  
  ```
<div>
  <p>
    I am girl , i got the gift {{gift}}
  </p>

  <button (click)="reply()">回复他</button>

  <button (click)="change_gift()">女孩改变礼物</button>
</div>

  ```

由于使用自定义双向绑定值，所以原来的girl 组件需要修改一下使用方法

boy.component.html:

```
<app-girl (message)="get_message($event)" [(ngModel)]="gift">

</app-girl>

```

这样通过点击女孩组件中的 修改礼物按钮。男孩组件的礼物值也会对应改变。

第一章完结


-------

### 章节列表

##### 2.服务
###### 2.1服务注入
###### 2.2实际场景介绍


service 在java中是一个很常见的概念。大部分javaer 都写过service层。这也是项目中必不可少的一个层。

#### 2.1 服务，inject的概念

对于大部分前端开发者而言。没有依赖注入的概念。这里我们解释一下为什么要使用依赖注入。或者说有什么好处。

对于angular 2 + 而言。服务的注入（依赖注入）对于我们解决实际问题是有很大的帮助的

举例：

需求：导航栏要跟着路由进行 增减active 样式。
解决：设置global-service。 <b>添加 currentUrl 变量。在最外层路由的组件(假设是AppComponent)中。注入global-service, OnInit() hook 中 监听路由切换。设置注入的gloabl-service的 currentUrl</b>。
在导航的组件（假设是NavigateComponent）中,同样注入global-service 

我们写一段伪代码

```html
<ul>
<li class="{global_service.currentUrl=='/' ? 'active' : 'un_active'}">首页</li>
</ul>

```

由于注入的global-service 在AppComponent 和  NavigateComponent 是同一个实例。所以无论哪一方改变了值。不同的组件都会及时响应值的改变。
<br>
以上是最简单的服务注入的例子。

2.2 服务的使用的实际场景。

在上一小章节我们介绍了一个很难简单的例子。当然也可以通过其他方式实现。如组件值传递之类的，实现方式有很多。因人而异。
下面介绍一些其他的实际场景

<li>1.目前官方文档中的例子，请求接口。将接口请求方法放入service中。不同组件注入调用。减少对象创建开销（大部分1个）。
<li>2.共享一些全局变量。控制某些组件状态，如loading。notifycation
<li>3.做一些页面结构，通用业务处理。如 动态组件渲染。日志等。


关于如何注入。如何编写service，更多关于服务的细节官方文档已经很详细的说明。不再赘述。这部分只讲实际应用。

----



### 章节列表

##### 3.指令
###### 1.1自定义指令
###### 1.2ckeditor实际应用指令
###### 1.3host listener

指令的用途...实在是太有用了。甚至有用到我都不想用组件(Component)了。

指令分两种。一种是结构型指令。一种是属性型指令。

属性型指令比较简单。这里盗用官方的例子。

```
<p appGreen>把我变绿色</p>

```

对应的指令类。

```
import { Directive, ElementRef, Input } from '@angular/core';

@Directive({ selector: '[appGreen]' })
export class GreenDirective {
    constructor(el: ElementRef) {
       el.nativeElement.style.backgroundColor = 'green';
    }
}

```

<ol>
<li>
<p translation-result=""><code><a href="http://www.angular.cn/api/core/Directive" class="code-anchor">Directive</a></code>提供<code>@<a href="api/core/Directive" class="code-anchor">Directive</a></code>装饰器功能。  </p>

</li>
<li>
<p translation-result="">   <code><a href="http://www.angular.cn/api/core/ElementRef" class="code-anchor">ElementRef</a></code><a href="guide/dependency-injection">注入</a>到指令构造函数中。这样代码就可以访问 DOM 元素了。<br>
</p>
</li>
<li>
<p translation-result=""><code><a href="http://www.angular.cn/api/core/Input" class="code-anchor">Input</a></code>将数据从绑定表达式传达到指令中。</p>
</li>
</ol>


我们跟着官方做完了第一个自定义指令。

现在讲下结构型指令
结构型指令主要有三个东西  

首先是构造器中的  <b>TemplateRef  ViewContainerRef</b>

ViewContainerRef: 视图容器引用。在这里可以理解为加指令的外部容器。 <br>
TemplateRef: 容器内部元素。

怎么用结构型指令呢
官方文档有详细例子。这里我们只说重点：


```
@Input set what_the_fuck(value){
	viewContainer.createEmbeddedView(templateRef)
} 

```

这里在指令中接受set 值。 

```
<div  what_the_fuck = 'a' >
	<p>我爱学习</p>
</div>

```

这里看到的效果是不论如何都会创建 <code>`<p>我爱学习</p>`</code> 的html的


当然也可以自行根据设置a的值去判断是否创建。


<h3>现在我们自己写一个指令。ckeditor的实例化指令。</h3>

首先引入ckeditor。这里我们用cdn引入。
在index.html 中引入。

```js
  <script src="https://cdn.ckeditor.com/4.7.3/standard/ckeditor.js"></script>
```

创建 inline-ckeditor.directive.ts，ckeditor_config.ts

ckeditor_config.ts为配置文件。
直接复制官方的即可。

```js
export const ckeditor_config = {
  language: 'zh-CN',
  toolbar: [
    {name: 'styles', items: ['Font', 'FontSize']},
    {name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike']},
    {name: 'colors', items: ['TextColor', 'BGColor']},
    {name: 'align', items: ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock']},

  customConfig: '',

  removePlugins: 'image',


  height: 80,

  stylesSet: [
    /* Inline Styles */
    {name: 'Marker', element: 'span', attributes: {'class': 'marker'}},
    {name: 'Cited Work', element: 'cite'},
    {name: 'Inline Quotation', element: 'q'},
    /* Object Styles */
    {
      name: 'Special Container',
      element: 'div',
      styles: {
        padding: '5px 10px',
        background: '#eee',
        border: '1px solid #ccc'
      }
    },
    {
      name: 'Compact table',
      element: 'table',
      attributes: {
        cellpadding: '5',
        cellspacing: '0',
        border: '1',
        bordercolor: '#ccc'
      },
      styles: {
        'border-collapse': 'collapse'
      }
    },
    {name: 'Borderless Table', element: 'table', styles: {'border-style': 'hidden', 'background-color': '#E6E6FA'}},
    {name: 'Square Bulleted List', element: 'ul', styles: {'list-style-type': 'square'}},
    /* Widget Styles */
    // We use this one to style the brownie picture.
    {name: 'Illustration', type: 'widget', widget: 'image', attributes: {'class': 'image-illustration'}},
    // Media embed
    {name: '240p', type: 'widget', widget: 'embedSemantic', attributes: {'class': 'embed-240p'}},
    {name: '360p', type: 'widget', widget: 'embedSemantic', attributes: {'class': 'embed-360p'}},
    {name: '480p', type: 'widget', widget: 'embedSemantic', attributes: {'class': 'embed-480p'}},
    {name: '720p', type: 'widget', widget: 'embedSemantic', attributes: {'class': 'embed-720p'}},
    {name: '1080p', type: 'widget', widget: 'embedSemantic', attributes: {'class': 'embed-1080p'}}
  ]
}

```

上面的我们做了一些简化。留一些基础的就可以。

下面打开我们的inline-ckeditor.directive.ts

```js
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from "@angular/forms";
import {Injectable, Directive, ElementRef, Input, Output, EventEmitter, forwardRef, Provider} from '@angular/core';
import {ckeditor_config} from "./ckeditor_config";

const CKEDITOR = window['CKEDITOR']
CKEDITOR.disableAutoInline = true;

@Directive({
  selector: '[inline-ckeditor]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InlineCkeditorDirective),
      multi: true
    }
  ]
})
export class InlineCkeditorDirective {


  writeValue(obj: any): void {
    this.content = obj
    if (this.editor) {
      this.editor.setData(this.content)
    }
    this.onChange(obj)
  }

  onChange: any = Function.prototype;
  onTouched: any = Function.prototype;


  registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  constructor(public elm: ElementRef) {

  }

  @Input('id') id: string = ''

  @Input('content') content: string = ''

  editor: any

  editor_init = false

  @Output() content_change: EventEmitter<string> = new EventEmitter<string>()

  ngAfterViewChecked() {

  }

  ngOnInit() {
    this.create_editor()
  }

  ngAfterViewInit() {

  }

  create_editor() {

    let el = this.elm.nativeElement
    setTimeout(() => {
      let editor = CKEDITOR.inline(el, ckeditor_config);
      this.editor = editor
      this.editor.setData(this.content)
      editor.on('change', (evt) => {
        this.content = evt.editor.getData()
        this.onChange(this.content)
        this.content_change.emit(this.content)
      });

    }, 200)
    this.editor_init = true
  }

  ngOnDestroy() {
    if (this.editor) {
      this.editor.destroy()
    }
  }
}

```

这里用到了我们第一章的知识。 自定义双向绑定，对的 你没看错，不管是组件 还是指令。都能使用这项设定。

下面我们会一一解释下运作。

关于双向绑定的部分看第一章。这里不做赘述。

首先 核心部分 create_editor() 函数。

```js
  create_editor() {
	<!--拿到当前的元素-->	
    let el = this.elm.nativeElement
<!--    这里为什么要设置延时呢。由于content数据是异步的，不同的设置值 可能会导致组件的生命周期发出警报。有些值得检测会判定为已经检测过-->
    setTimeout(() => {
      let editor = CKEDITOR.inline(el, ckeditor_config);
      this.editor = editor
      this.editor.setData(this.content)
      <!--添加change函数-->
      editor.on('change', (evt) => {
        this.content = evt.editor.getData()
        this.onChange(this.content)
        this.content_change.emit(this.content)
      });

    }, 200)
    <!--设置初始化成功-->
    this.editor_init = true
  }

```

整个过程很简单。就是调用下ckeditor的api 也没什么复杂的。
然后看看我们的使用。

```
<div inline-ckeditor contenteditable="true" [(ngModel)]="ckeditor_content"></div>
```

当然。这里的选择器也可以以类名做选择 如 selector: '.inline-ckeditor'


至此 这个指令就可以使用。 命令某个带inline-ckeditor class的dom元素 变成 ckeditor。


#### host listener 和 hostbinding

是一种事件监听和值绑定。这里我们也可以写在 同样的ckeditor的指令中


```
  _active: boolean = false


//点击
  @HostListener('click') handleClick() {
    this.setActive()
  }

//光标移出
  @HostListener('blur') handleBlur() {
    this._active = false
  }

//选中
  @HostListener('focus') handleFocus() {
    this._active = true
  }


  setActive() {
    this._active = true
  }

//设置active class
  @HostBinding('class.active')
  get active() {
    return this._active
  }
  
```

这里主要的作用是 在选中和点击的时候。该dom元素增加一个active的class。可以用来标记出哪个是正在使用中的ckeditor。


有人更愿意用组件。有人更愿意做指令。其实两者缺一不可。个人觉得复杂的业务。用组件(Component)，一些单一的。类似于修饰用到组件，可以用指令去替代。

----

#### 动态组件的使用。

来到这一章节。说明你遇到了一些需求问题

需求：根据后端返回的一些数据。动态的渲染一些组件。甚至说进行一些值的绑定。然后在进行渲染。

废话少说。直接开始

我们先把要渲染的动态组件生成好

```
ng g component gay
ng g component hero

```

创建一个gay 和一个hero。用作我们动态渲染的组件。cli会自动帮我们加入module。不过这里要注意一点。

我们需要额外加点东西。

在app.module.ts中

```js
@NgModule({
  declarations: [
    AppComponent, InlineCkeditorDirective, BoyComponent, GirlComponent, GayComponent, HeroComponent
  ],
  imports: [
    routing,
    CommonModule,
    BrowserModule,
    FormsModule
  ],
  entryComponents:[GayComponent,HeroComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

加入  <code>entryComponents:[GayComponent,HeroComponent]</code>

为什么要加呢。stack上解释的很清楚了：

The entryComponents array is used to define only components that are not found in html and created dynamically with ComponentFactoryResolver. Angular needs this hint to find them and compile. All other components should just be listed in the declarations array.

平时也要注意英文的训练。作为装逼王。这点必不可少。
我来给大家翻译一下。如果大家觉得自己看好费劲，可以参照我的插件 <a href='https://github.com/icepoint0/blade-translate'>blade-translate</a>

入口组件数组呢是用来定义那些用 <em>ComponentFactoryResolver</em> 创建出来的组件。需要angular 找到并且编译。 这个就是declare 和这个区别了。

言归正传。我们继续

创建一个service。作为动态创建组件的service

<b>dynamic-section.service.ts</b>
（代码稍后补充）

创建一个 SectionItem

用来构造组件。以及组件data

section-item.ts:

```js
import {Type} from '@angular/core';

export class SectionItem {
  constructor(public component: Type<any>, public data: any) {
  }
}
```

我们还要创建一个接口 用来定义我们的动态组件的范型

custom-section-interface.ts:

```js
export interface CustomSection {
  content: any
}
```

这里内容给any类型。也可以自己构造类型。

接口实现了，要给我们的gay 和hero 实现它

```js
export class GayComponent implements OnInit,CustomSection {
  content: any;

  constructor() { }

  ngOnInit() {
  }

}

```

hero同上


别忘了 为了后期好维护。我们要自己构建一个hash const。

section-factory:

```js
import {GayComponent} from "./gay/gay.component";
import {HeroComponent} from "./hero/hero.component";

const sections = {
  "gay": GayComponent,
  "hero": HeroComponent
}


export class SectionFactory {


  buildSection = (name, options) => {
    return sections[name](options)
  }

  get = (name) => {
    return sections[name]
  }

}
```
为了加载我们的组件。我们还需要创建一个容器。用来create

```
ng g component section-wrapper


```
修改组件内容 加入构造器，<b>ViewContainerRef</b>

```
import {Component, OnInit, ViewContainerRef} from '@angular/core';

@Component({
  selector: 'app-section-wrapper',
  templateUrl: './section-wrapper.component.html',
  styleUrls: ['./section-wrapper.component.css']
})
export class SectionWrapperComponent implements OnInit {

  constructor(public view_container_ref:ViewContainerRef) { }

  ngOnInit() {
  }

}


```

好了 基础工作都做完了。
现在要进行动态渲染服务的编写了。

**回到我们的 `dynamic-section.service.ts`**

加入构造器：

```js
 constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }
```
载入组件方法

```js
 loadComponent(viewContainerRef: ViewContainerRef, sectionItem: SectionItem) {
    let componentFactory = this.componentFactoryResolver
      .resolveComponentFactory(sectionItem.component);
    let componentRef = viewContainerRef.createComponent(componentFactory);
    let custom_section: CustomSection = <CustomSection>componentRef.instance;
    custom_section.content = sectionItem.data;
  }
```

解释下这个方法。

入参

`viewContainerRef`：之前章节有提过。视图容器引用

`sectionItem`：我们刚才编写的组件构造器。用来包容组件和data的

方法第1，2行。表示我们要通过工厂创建一个组件。并且在视图容器中加载

然后第三行。拿到这个组件的instance(实例)

第四行把data赋值进去 这样就成功的给一个 ref 创建了一个组件child。

继续添加方法:

```js
 clearComponent(viewContainerRef: ViewContainerRef) {
    viewContainerRef.clear();
  }

  removeComponent(viewContainerRef: ViewContainerRef, index: number) {
    viewContainerRef.remove(index)
  }


  getAllSection(contents) {
    //构建工厂
    let section_factory = new SectionFactory()
    let sections = []
    sections = contents.map(content => {
      return new SectionItem(section_factory.get(content.category), content)
    })

    return sections
  }

  getSection(content){
    let section_factory = new SectionFactory()
    return new SectionItem(section_factory.get(content.category), content)
  }
```

clear,remove 是自带得api。用来清除容器内部的东西

<b>getAllSection</b>: 是根据我们的contents数组的类型。来map出一个sectionItem数组。

这个稍后回用到。

至此。我们的整个service 就已经写完了。

现在我们要运用它

创建一个组件。

```
ng g gay-and-hero

```

在该组件对应的页面模板中添加

```html
<p>
  <strong>基佬英雄产生器</strong>
</p>

<div>
  <button (click)="add('gay')">添加gay</button>
  <button (click)="add('hero')">添加hero</button>
</div>

<app-section-wrapper>

</app-section-wrapper>

```

这里就要对应的添加方法了。

注意此处，我们把`<app-section-wrapper>` 加入了进来。 

所以对应的我们需要用到它，获得他的引用：
在组件中添加

```
 @ViewChild(SectionWrapperComponent)
  private SectionContainer: SectionWrapperComponent;

```

之后在组件中添加方法add:

```js
 add(type: string) {

    let content = {name: '我是gay吗', category: type}
    let section = this.dynamic_section_service.getSection(content)
    this.dynamic_section_service.loadComponent(this.SectionContainer.view_container_ref, section)

  }

```

这里的content只是单纯的构造一个hash

。再回头看看我们的gay 和 hero 模板：

```html
gay:
<p>
  gay works!
</p>

hero:
<p>
  hero works!
</p>
```

这里其实可以加一行

判断我们的content是否真的赋值成功了

```
<p>
  gay works! {{content.category}}
</p>
```


然后再在页面中点击按钮。会发现在容器中会添加我们要的组件。


#### 章节结尾说明

这里额外说一点。动态组件的需求说多不多 说少不少。个人建议有必要掌握。如stringkly那种模式。

----


### Angular CLI 相关实践

#### 跨域解决

跨域是浏览器行为。解决方式主要有以下两种

##### 1.本机前后端项目端口代理。下面以angular-cli 为例：

在跟项目下创建 proxy.json

以java项目为例 大部分tomcat 端口开放在8080

并且项目接口均以/api 开头。

proxy.json

```json
{
  "/api/*": {
    "target": "http://localhost:8080",
    "secure": false,
    "logLevel": "debug"
  }
  }
```

添加完。保存。
 
然后中断我们的项目。在我们的启动命令里 添加一条参数

```
 "start": "ng serve --proxy-config proxy.json"
```
注意。这里仅在开发环境下添加配置。生产环境不需要。

如果是 自己做的webpack配置。目前应该很少了吧。官方都不建议了。
但是还是给出一份。<a href="https://github.com/icepoint0/angular2-webpack-config">webpack配置</a>

现在讲讲生产环境 即部署环境如何处理。这里涉及到一些服务器知识了。
有兴趣的朋友可以了解下。不行就交给运维处理。

首先。以 **Nginx** 作为我们的server。 


```json
server{
...
location ^~ /api/ {
                proxy_pass http://127.0.0.1:8080;
            root /www/public;
        }
        ...
        }
```

在location 这里加个代理即可。

至于前端项目部署在哪个端口。自行考虑。

##### 2.后端项目做修改。

大部分前端人员比较懒。或者说不懂后端。没关系。交给后端去解决跨域吧

项目设置response 头，即可。具体细节不做赘述


### h5移动端开发以及微信配置相关问题


这里讲的是微信页面。非web app。

#### 1.微信认证跳转。

微信认证跳转由于需要验证域名。但是我们的域名又是localhost这种形式。那怎么办呢。

----- **修改host**

这里推荐大家一个好用的工具
 <a href="https://github.com/oldj/SwitchHosts">swicth host</a>
 
 修改完host 之后。启动项目。会发现报错了。
 
 ```
 invalid host header
 ```
 
 是的 angular-cli 会check 我们的host。没关系 这时候我们再在启动命令里加一行
 
 ```
 --disable-host-check
 ```
 
 这样就可以了。
 
 **记得要把端口改为80.微信连带端口也会一起检测的。**
 
 接下来就是要真🐔访问我们的项目作为测试。
 
 这里推荐一款软件 **<a href="https://www.charlesproxy.com/">charles</a>**
 
 👍 👍 👍 👍 👍 👍 👍 👍 👍
 
 很赞。未激活每次只有30分钟的寿命。但是也够测试了。不够再重新打开就行
 
 记得手机代理端口填写8888 在同一局域网内 用 
 
 `ipconfig` / `ifconfig` 检测下当前pc的局域网分配的ip地址就行
 
 
 到这里我们都配置了。相当于在正式环境的本机开发微信移动端了。这种感觉
 
 😊😊😊😊😊😊😊
 
 












 
