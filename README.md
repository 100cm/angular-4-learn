# 学习angular ^2


##起步

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

```
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

```
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

```
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
###### 1.1服务注入
###### 1.2实际场景介绍

### 章节列表

##### 3.指令
###### 1.1自定义指令
###### 1.2ckeditor实际应用指令
###### 1.3host listener












 
