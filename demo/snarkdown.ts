import * as marked from "marked";

let content = `Mobile Developer Weekly\n\n[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,e_colorize:10,co_rgb:99ff00/ss77satgdcctry5mm3jo.jpg)](https://mobiledevweekly.com/link/91697/web)\n\n[A Showcase of What Is Possible with PWAs](https://mobiledevweekly.com/link/91697/web) — This demo attempts to showcase, via examples, what you can do with Progressive Web Apps today. It’s a pretty neat way to interactively demonstrate the power of PWAs all in one place.\n\n[System Hardening in Android 11](https://mobiledevweekly.com/link/91698/web) — Highlights some of the security improvements made to the next major version of Android, including safer default settings, migrating to a hardened memory allocator, and expanding the use of compiler mitigations.\n\n[![](https://copm.s3.amazonaws.com/03c45284.png)](https://mobiledevweekly.com/link/91699/web)\n\n[Launch Scalable iOS/Swift, Android, React Chat in Days](https://mobiledevweekly.com/link/91699/web) — Stream makes it easy with SDKs and Chat React UI Components. Stream powers Feeds and Chat for over 500 million end-users.\n\nStream sponsor\n\n[Flutter vs Native vs React Native: Deep Performance Comparison](https://mobiledevweekly.com/link/91700/web) — A comparison between popular mobile development tools, looking at how FPS, CPU, memory, and GPU performance stack up in common tasks.\n\n[Understanding Plugin Development In Gatsby](https://mobiledevweekly.com/link/91701/web) — A detailed guide that looks at the different types of plugins and how to build your own plugin.\n\n[Khan Academy: Our Transition to React Native](https://mobiledevweekly.com/link/91702/web) — Bryan Clark runs through the multi-year project to move both the iOS and Android apps of their education platform over to using React Native.\n\n[Mixins in Dart: How to Use It](https://mobiledevweekly.com/link/91703/web) — How to use Mixins, simple classes to avoid multiple class hierarchies in Dart, to create cleaner Flutter apps.\n\n[How to Secure Mobile Apps – A Mobile App Security Checklist](https://mobiledevweekly.com/link/91704/web) — A few things to keep in mind.\n\n[Microsoft Edge On Android Will Soon Let You Try New Chrome Features](https://mobiledevweekly.com/link/91705/web) — You’ll be able to enable experimental features in the browser through the newly available edge://flags page.\n\n[How to Add A Ripple Animation to Your Flutter Apps](https://mobiledevweekly.com/link/91706/web)\n\n[FastIcon: Generate iOS & Android App Icon in Seconds](https://mobiledevweekly.com/link/91707/web)`;
let content_cn = '移动开发者周刊\n\n[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,e_colorize:10,co_rgb:99ff00/ss77satgdcctry5mm3jo.jpg) ](https://mobiledevweekly.com/link/91697/web) \n\n[展示PWA可能带来的效果](https://mobiledevweekly.com/link/91697/web) —该演示试图通过示例展示您今天可以使用Progressive Web Apps进行的操作。这是一种在一个地方以交互方式展示PWA强大功能的巧妙方法。\n\n[Android 11中的系统强化](https://mobiledevweekly.com/link/91698/web) —重点说明了对下一个主要版本的Android所做的一些安全性改进，包括更安全的默认设置，迁移到强化的内存分配器以及扩大了编译器缓解的使用。\n\n[![](https://copm.s3.amazonaws.com/03c45284.png) ](https://mobiledevweekly.com/link/91699/web) \n\n[在几天内推出可扩展的iOS / Swift，Android，React Chat](https://mobiledevweekly.com/link/91699/web) — Stream使使用SDK和Chat React UI组件变得容易。 Stream为超过5亿的最终用户提供Feed和Chat功能。\n\n流赞助\n\n[Flutter vs Native与React Native：深度性能比较](https://mobiledevweekly.com/link/91700/web) —流行移动开发工具之间的比较，研究FPS，CPU，内存和GPU性能如何在常见任务中叠加。\n\n[了解盖茨比的插件开发](https://mobiledevweekly.com/link/91701/web) —详细指南，介绍了不同类型的插件以及如何构建自己的插件。\n\n[可汗学院：我们向React Native的过渡](https://mobiledevweekly.com/link/91702/web) —布莱恩·克拉克(Bryan Clark)执行了这个多年项目，将其教育平台的iOS和Android应用程序迁移到使用React Native。\n\n[Dart中的Mixins：如何使用](https://mobiledevweekly.com/link/91703/web) —如何使用Mixins(避免在Dart中使用多个类层次结构的简单类)来创建更简洁的Flutter应用。\n\n[如何保护移动应用程序安全-移动应用程序安全检查表](https://mobiledevweekly.com/link/91704/web) —需要牢记的几件事。\n\n[Android上的Microsoft Edge很快就会让您尝试新的Chrome功能](https://mobiledevweekly.com/link/91705/web) —您将能够通过新提供的edge：// flags页面在浏览器中启用实验性功能。\n\n[如何在您的Flutter应用中添加涟漪动画](https://mobiledevweekly.com/link/91706/web) \n\n[FastIcon：几秒钟内生成iOS和Android应用程序图标](https://mobiledevweekly.com/link/91707/web) ';
let md = '_this_ is **easy** to `use`.';
console.log(marked(null));
console.log(marked(md));
console.log(marked(content));
console.log(marked(content_cn));
