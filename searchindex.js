Object.assign(window.search, {"doc_urls":["chapter_0.html#译序","chapter_1.html#前言","chapter_2/chapter_2.html#渲染流水线","chapter_2/2.1.html#21-架构","chapter_2/2.2.html#22-应用程序阶段","chapter_2/2.3.html#23-几何阶段","chapter_2/2.3.html#231-顶点着色","chapter_3/chapter_3.html#图形处理单元"],"index":{"documentStore":{"docInfo":{"0":{"body":0,"breadcrumbs":0,"title":0},"1":{"body":0,"breadcrumbs":0,"title":0},"2":{"body":3,"breadcrumbs":0,"title":0},"3":{"body":13,"breadcrumbs":1,"title":1},"4":{"body":7,"breadcrumbs":1,"title":1},"5":{"body":3,"breadcrumbs":1,"title":1},"6":{"body":26,"breadcrumbs":1,"title":1},"7":{"body":0,"breadcrumbs":0,"title":0}},"docs":{"0":{"body":"我自己看书自己翻着看的，不求精确，如果有幸帮助到您，我感到很荣幸；如果产生了误导，请联系我更正，谢谢。","breadcrumbs":"译序 » 译序","id":"0","title":"译序"},"1":{"body":"待翻","breadcrumbs":"前言 » 前言","id":"1","title":"前言"},"2":{"body":"链条最薄弱的地方是链接处 —— 佚名 本章介绍实时渲染的核心内容，所谓 渲染流水线 ，或所谓“ 管线 ”。渲染流水线的主要功能是，从给定的虚拟相机，三维物件，光源等，生成或者说“ 渲染 ”出一张二维的图片。 流水线就是实时渲染的底层机制了。此流程可见图2.1（本书不插图，请见原书，下同）。 渲染结果图中的物体位置由以下因素决定：所有物件的几何形状，环境特征，相机的位置。 结果图中物体的外观特征由以下因素决定：材质，光源，贴图，以及着色器程。 图2.1注： 左侧可见虚拟相机在金字塔的尖端处（4条线汇集处）。只有可见范围内的物件会被渲染。在透视相机（这个图里就是这种）的渲染中，可见范围是一个 平头锥体 。 右图是相机所“见”的效果。注意左边的红色甜甜圈没被渲染出来，因为它在可见范围外。以及蓝色的那个玩意儿，被裁剪了一部分。 之后的内容我们逐个阶段进行介绍，但是着重于功能而不是实现，实现后面的章节会讲","breadcrumbs":"渲染流水线 » 渲染流水线","id":"2","title":"渲染流水线"},"3":{"body":"现实世界中流水线有多个含义，我们渲染里也取这个词来用，表示流水线分成多个阶段，每个阶段代表一个比较独立的大任务。 流水线的每级是并行的，其输入依赖前一级的输出。理想情况下，n级的流水线效率提升应当是没有流水化的n倍。这是我们采用流水线的主要原因。例略。 流水线会因为最慢的一级没有完成任务而停机。我们把这一级叫做流水线的 瓶颈 ，后面的级就处于 饥饿 状态。 实时渲染流水线可以粗略分成4个阶段：应用程序，几何处理，光栅化，像素处理。见图2.2。这个图很重要，它是后面的章节的重要的基础。通常每个阶段自己都是一条流水线，也就是说每个阶段包含了若干的子阶段。 我们此处需要区分功能上的阶段和实现上的阶段。功能上每个阶段有特定的事情要做，但是不指明具体怎么实现的。实际的实现其实可能会把多个阶段结合到一个计算单元里面去，也可能把一个费时间的计算过程拆分到不同的硬件单元去。 图2.2 前略。每个阶段可以自己又是一个流水线，例如几何处理阶段；也可以是一个并行处理的阶段，例如像素处理阶段。图中的应用程序阶段是表示成了一个单独的阶段，但这个阶段也可以被流水化或者并行化。 注意光栅化阶段找到了一个图元或者说三角形里内部的的这些像素。 渲染的速度使用 每秒的帧数 （fps）来表征，也就是每秒能渲染出多少张图片。也可以用 赫兹 （Hz）作为单位。使用渲染一张图片需要多少毫秒来表征速度的方法也很常见。 渲染一帧所需的时间根据实际情况会有很大差别。fps可以表征特定帧的生成速度，也可以表征平均的性能。赫兹用于硬件，是设置为定值的。 如其名，应用阶段是被应用驱动的，通常情况是在cpu上实现。cpu通常是多核的，具有并行处理的能力。因此适合处理应用阶段的各种各样的任务。常见的这样的任务有：碰撞检测，一些全局的加速优化（原文global acceleration algorithms），动画，物理模拟，等等。 下一个主要阶段是几何处理，负责坐标变换，投影，所有的几何上的处理。此阶段决定什么东西要被画，怎么画，画在哪。此阶段在gpu上执行，包含很多可编程的计算核和一些做死的计算硬件。 光栅化阶段把输入的3个顶点，组成三角形，然后找到内部的像素，然后把他们喂给下一个阶段。 最后像素阶段对每个像素执行一个程序，决定其颜色，或再根据深度测试决定是否像素可见。此阶段也可以执行其他逐像素操作，如根据前一个像素的颜色和新计算的像素的颜色混合出最终的颜色。 光栅化阶段和像素阶段都完全在gpu上执行。 接下来4个部分讨论所有这些阶段。更多细节见 图形处理单元","breadcrumbs":"渲染流水线 » 架构 » 2.1 架构","id":"3","title":"2.1 架构"},"4":{"body":"因为大多是cpu计算，所以开发者决定这个阶段该干嘛，怎么实现，怎么优化。但是有时候这个阶段还是能影响后面的阶段的。例如，某应用程序阶段的算法决定哪些三角形需要拿来渲染。 但是有的应用阶段也可以用gpu来运算。因为gpu有 compute shader ，用它可以把gpu当作通用并行计算核来使用，无视其图形渲染的功能。 此阶段最后，需要把需要绘制的几何传给下一阶段。这些东西被我们称作 渲染图元 。包括点，线，三角形，或者说所有可能被画到屏幕上的玩意儿。这个工作是应用程序阶段的最重要的任务。 因为这个阶段通常是cpu计算，它就不像其他阶段一样可以拆分为子阶段。不过为了提高性能，此阶段通常在多个核上并行处理。cpu中还有超标量结构，可以支持同时执行多个操作。 18.5 会介绍一些多核计算的实现方法。 此阶段常见的一个工作是 碰撞检测 。可在检测到两个物体有碰撞后，产生响应并返回给碰撞物体，或者传递给力反馈设备（译注：手柄？）。 此阶段还负责处理外部设备的输入，如键盘，鼠标，头戴式显示设备等；根据输入可以进行若干处理。一些加速算法也在这个阶段发生，例如典型的剔除算法。此阶段还有包括后面的渲染流程无法做的其他所有事情。","breadcrumbs":"渲染流水线 » 应用程序阶段 » 2.2 应用程序阶段","id":"4","title":"2.2 应用程序阶段"},"5":{"body":"运行在gpu中的几何阶段负责大部分的逐三角形或逐顶点的计算。此阶段从功能上可分为：顶点着色，投影，裁剪，屏幕映射。见图2.3。 图2.3 几何阶段被分为这4个阶段","breadcrumbs":"渲染流水线 » 几何阶段 » 2.3 几何阶段","id":"5","title":"2.3 几何阶段"},"6":{"body":"此阶段有两个目标：1是计算所有顶点的位置，2是计算任何程序员想计算的顶点上的数据，例如法向量或者贴图坐标。 传统地做法是，物体的着色是由它的每个顶点的位置、法向量，再根据光照计算得来，并且顶点上就存算得的颜色数据，后续步骤把顶点上的颜色插值到每个像素。 因此，可编程的顶点着色计算单元又称为顶点着色器。在现在的gpu里，所有的着色都是逐像素的，顶点着色阶段不用负责着色方程的计算了，而是变得非常通用。 现在这个阶段只是处理关联在逐顶点的数据。比如使用 4.4 的方法，可以使用此阶段给一个物体实现动画的效果。 首先介绍位置如何计算，物体从一开始到最后到屏幕上画处理，中间涉及好几个空间，或者说好几个坐标系。 一开始模型在自己的 模型空间 里。 不同模型之间通过 模型变换 关联起来。一个模型可以关联多个这样的变换。这用来实现一个模型对应多个实例的功能。实例可以放在不同的位置上，拥有不同的大小，旋转，而避免复制模型自身数据。 模型变换要变的是模型的顶点和法向量。物体一开始叫做处于模型坐标系，把变换应用上之后，物体就处于世界坐标系，或者说世界空间。世界空间只有一个，模型们都变换完后，就同处于这一个世界空间内。 如前文所述，只有相机看到的东西需要被渲染。相机在世界空间中有位置和朝向。为了解决投影和裁剪，对相机和所有模型要进行 视口变换 。这个变换的目的是把相机放到原点，让它对着负z轴方向拍摄，然后正y方向是上面，正x是右手边。这里使用负z方向，也有使用正z方向的，两种没什么大差别，相互变换也很容易。这里使用哪种位置和方向的定义取决于实际的图形api。这个空间被称作 相机空间 ，或者 视口空间 ， eye space（译注：不译） 。图2.4展示了一个定义的例子。模型变换和视口变换的实现都是使用4x4的矩阵，在 c4 会介绍。我们一定要理解的是，顶点的位置和法向量是程序员想算成多少就能算成多少的。 图2.4 懒译，反正展示了最后的相机空间是怎么摆的。 接下来我们要介绍顶点着色的另一个输出。为了渲染出真实场景效果，只渲染物体的位置和形状是不够的，还要考虑他们的外观特性。具体需要考虑每个物体的材质，以及所有光源是如何影响到这个物体的。材质和光照可以用好多方法来建模，简单的可以只是颜色，复杂的可以是某种物理特性的表述。 决定材质和光照产生的效果的步骤叫做 着色 。着色需要在物体的各个点上计算一个 着色方程 。一般来说，这个计算的一部分在几何阶段进行，也有一些在逐像素的阶段进行。很多材质信息可以逐顶点存储，例如位置，法向量，颜色，及其他着色计算需要的数值。顶点着色的结果（包含颜色，向量，材质坐标等数据）传送到像素阶段，插值到像素，然后计算最终表面的着色。 本书 c3 和 c5 会深入介绍以gpu顶点着色器来表示的顶点着色。 顶点着色中会进行 投影 和 裁剪 ，这两步把视口内的体积（译注：以前说的平截头体）变换成一个单位立方体，坐标从(-1,-1,-1)到(1,1,1)。这个范围也是随意定义的，比如z可以定义成从0到1。这个立方体叫做 规范化的视口体积 （译注：从空间的角度，《引架》里叫齐次裁剪空间）。两个步骤里先进行投影，在gpu里通过顶点着色器进行。一般有两种投影方式， 正交投影 和 透视投影 。如图2.5。正交投影又常被称作平行投影，但是它只是平行投影中的一种。建筑领域还常用其他的一些种，具体懒译。 注意投影也是用矩阵表示的（ 4.7 ），因此它可以跟其他的几何变换先结合运算。 正交投影的视口体积是个长方体，正交投影变换把它变换成单位立方体。正交投影的特征是平行线变换后还是平行线。这个变换就是个位移和缩放的组合。 透视投影稍复杂。投影后有近大远小的效果。平行线在视平线处出现灭点。这模仿了人眼感知事物的方式。透视投影的视口体积是平截头体，它也是被变换到单位立方体。两种透视变换都可以用4x4矩阵表示（见 c4 ）。变换完后模型就在 裁剪坐标系 里。它是个齐次坐标系，也是 c4 会介绍。这一步发生在除以w之前，为了后续功能步骤和裁剪能正常工作，顶点着色器的输出必须是这个类型的（译注：vec4）。 虽然这些变换是把体积变成另一个体积，但是因为后面z轴信息不是存储在图片里，而是在一个叫z-buffer的地方，所以模型还是从3维投影成了2维。z-buffer在 2.5 中介绍。","breadcrumbs":"渲染流水线 » 几何阶段 » 2.3.1 顶点着色","id":"6","title":"2.3.1 顶点着色"},"7":{"body":"","breadcrumbs":"图形处理单元 » 图形处理单元","id":"7","title":"图形处理单元"}},"length":8,"save":true},"fields":["title","body","breadcrumbs"],"index":{"body":{"root":{"1":{")":{"df":0,"docs":{},"到":{"(":{"1":{",":{"1":{",":{"1":{")":{"df":0,"docs":{},"。":{"df":0,"docs":{},"这":{"df":0,"docs":{},"个":{"df":0,"docs":{},"范":{"df":0,"docs":{},"围":{"df":0,"docs":{},"也":{"df":0,"docs":{},"是":{"df":0,"docs":{},"随":{"df":0,"docs":{},"意":{"df":0,"docs":{},"定":{"df":0,"docs":{},"义":{"df":0,"docs":{},"的":{"df":0,"docs":{},"，":{"df":0,"docs":{},"比":{"df":0,"docs":{},"如":{"df":0,"docs":{},"z":{"df":0,"docs":{},"可":{"df":0,"docs":{},"以":{"df":0,"docs":{},"定":{"df":0,"docs":{},"义":{"df":0,"docs":{},"成":{"df":0,"docs":{},"从":{"0":{"df":0,"docs":{},"到":{"1":{"df":1,"docs":{"6":{"tf":1.0}}},"df":0,"docs":{}}},"df":0,"docs":{}}}}}}}}}}}}}}}}}}}}}}}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}}},"8":{".":{"5":{"df":1,"docs":{"4":{"tf":1.0}}},"df":0,"docs":{}},"df":0,"docs":{}},"df":1,"docs":{"6":{"tf":1.4142135623730951}},"是":{"df":0,"docs":{},"计":{"df":0,"docs":{},"算":{"df":0,"docs":{},"所":{"df":0,"docs":{},"有":{"df":0,"docs":{},"顶":{"df":0,"docs":{},"点":{"df":0,"docs":{},"的":{"df":0,"docs":{},"位":{"df":0,"docs":{},"置":{"df":0,"docs":{},"，":{"2":{"df":1,"docs":{"6":{"tf":1.0}}},"df":0,"docs":{}}}}}}}}}}}}},"2":{".":{"1":{"df":2,"docs":{"2":{"tf":1.4142135623730951},"3":{"tf":1.0}}},"2":{"df":2,"docs":{"3":{"tf":1.0},"4":{"tf":1.0}}},"3":{".":{"1":{"df":1,"docs":{"6":{"tf":1.0}}},"df":0,"docs":{}},"df":1,"docs":{"5":{"tf":1.4142135623730951}}},"4":{"df":1,"docs":{"6":{"tf":1.0}},"展":{"df":0,"docs":{},"示":{"df":0,"docs":{},"了":{"df":0,"docs":{},"一":{"df":0,"docs":{},"个":{"df":0,"docs":{},"定":{"df":0,"docs":{},"义":{"df":0,"docs":{},"的":{"df":0,"docs":{},"例":{"df":0,"docs":{},"子":{"df":0,"docs":{},"。":{"df":0,"docs":{},"模":{"df":0,"docs":{},"型":{"df":0,"docs":{},"变":{"df":0,"docs":{},"换":{"df":0,"docs":{},"和":{"df":0,"docs":{},"视":{"df":0,"docs":{},"口":{"df":0,"docs":{},"变":{"df":0,"docs":{},"换":{"df":0,"docs":{},"的":{"df":0,"docs":{},"实":{"df":0,"docs":{},"现":{"df":0,"docs":{},"都":{"df":0,"docs":{},"是":{"df":0,"docs":{},"使":{"df":0,"docs":{},"用":{"4":{"df":0,"docs":{},"x":{"4":{"df":1,"docs":{"6":{"tf":1.0}}},"df":0,"docs":{}}},"df":0,"docs":{}}}}}}}}}}}}}}}}}}}}}}}}}}}}},"5":{"df":1,"docs":{"6":{"tf":1.4142135623730951}}},"df":0,"docs":{}},"df":0,"docs":{}},"3":{"df":1,"docs":{"3":{"tf":1.0}}},"4":{".":{"4":{"df":1,"docs":{"6":{"tf":1.0}}},"7":{"df":1,"docs":{"6":{"tf":1.0}}},"df":0,"docs":{}},"df":3,"docs":{"2":{"tf":1.0},"3":{"tf":1.0},"5":{"tf":1.0}},"x":{"4":{"df":1,"docs":{"6":{"tf":1.0}}},"df":0,"docs":{}},"个":{"df":0,"docs":{},"阶":{"df":0,"docs":{},"段":{"df":0,"docs":{},"：":{"df":0,"docs":{},"应":{"df":0,"docs":{},"用":{"df":0,"docs":{},"程":{"df":0,"docs":{},"序":{"df":0,"docs":{},"，":{"df":0,"docs":{},"几":{"df":0,"docs":{},"何":{"df":0,"docs":{},"处":{"df":0,"docs":{},"理":{"df":0,"docs":{},"，":{"df":0,"docs":{},"光":{"df":0,"docs":{},"栅":{"df":0,"docs":{},"化":{"df":0,"docs":{},"，":{"df":0,"docs":{},"像":{"df":0,"docs":{},"素":{"df":0,"docs":{},"处":{"df":0,"docs":{},"理":{"df":0,"docs":{},"。":{"df":0,"docs":{},"见":{"df":0,"docs":{},"图":{"2":{".":{"2":{"df":1,"docs":{"3":{"tf":1.0}}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}}}}}}}}}}}}}}}}}}}}}}}}}}},"a":{"c":{"c":{"df":0,"docs":{},"e":{"df":0,"docs":{},"l":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"df":1,"docs":{"3":{"tf":1.0}}}}}}},"df":0,"docs":{}},"df":0,"docs":{},"l":{"df":0,"docs":{},"g":{"df":0,"docs":{},"o":{"df":0,"docs":{},"r":{"df":0,"docs":{},"i":{"df":0,"docs":{},"t":{"df":0,"docs":{},"h":{"df":0,"docs":{},"m":{"df":1,"docs":{"3":{"tf":1.0}}}}}}}}}}},"b":{"df":0,"docs":{},"u":{"df":0,"docs":{},"f":{"df":0,"docs":{},"f":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"df":1,"docs":{"6":{"tf":1.0}},"的":{"df":0,"docs":{},"地":{"df":0,"docs":{},"方":{"df":0,"docs":{},"，":{"df":0,"docs":{},"所":{"df":0,"docs":{},"以":{"df":0,"docs":{},"模":{"df":0,"docs":{},"型":{"df":0,"docs":{},"还":{"df":0,"docs":{},"是":{"df":0,"docs":{},"从":{"3":{"df":0,"docs":{},"维":{"df":0,"docs":{},"投":{"df":0,"docs":{},"影":{"df":0,"docs":{},"成":{"df":0,"docs":{},"了":{"2":{"df":0,"docs":{},"维":{"df":0,"docs":{},"。":{"df":0,"docs":{},"z":{"df":1,"docs":{"6":{"tf":1.0}}}}}},"df":0,"docs":{}}}}}}},"df":0,"docs":{}}}}}}}}}}}}}}}}}},"c":{"3":{"df":1,"docs":{"6":{"tf":1.0}}},"4":{"df":1,"docs":{"6":{"tf":1.7320508075688772}}},"5":{"df":1,"docs":{"6":{"tf":1.0}}},"df":0,"docs":{},"o":{"df":0,"docs":{},"m":{"df":0,"docs":{},"p":{"df":0,"docs":{},"u":{"df":0,"docs":{},"t":{"df":1,"docs":{"4":{"tf":1.0}}}}}}},"p":{"df":0,"docs":{},"u":{"df":1,"docs":{"4":{"tf":1.0}},"上":{"df":0,"docs":{},"实":{"df":0,"docs":{},"现":{"df":0,"docs":{},"。":{"c":{"df":0,"docs":{},"p":{"df":0,"docs":{},"u":{"df":0,"docs":{},"通":{"df":0,"docs":{},"常":{"df":0,"docs":{},"是":{"df":0,"docs":{},"多":{"df":0,"docs":{},"核":{"df":0,"docs":{},"的":{"df":0,"docs":{},"，":{"df":0,"docs":{},"具":{"df":0,"docs":{},"有":{"df":0,"docs":{},"并":{"df":0,"docs":{},"行":{"df":0,"docs":{},"处":{"df":0,"docs":{},"理":{"df":0,"docs":{},"的":{"df":0,"docs":{},"能":{"df":0,"docs":{},"力":{"df":0,"docs":{},"。":{"df":0,"docs":{},"因":{"df":0,"docs":{},"此":{"df":0,"docs":{},"适":{"df":0,"docs":{},"合":{"df":0,"docs":{},"处":{"df":0,"docs":{},"理":{"df":0,"docs":{},"应":{"df":0,"docs":{},"用":{"df":0,"docs":{},"阶":{"df":0,"docs":{},"段":{"df":0,"docs":{},"的":{"df":0,"docs":{},"各":{"df":0,"docs":{},"种":{"df":0,"docs":{},"各":{"df":0,"docs":{},"样":{"df":0,"docs":{},"的":{"df":0,"docs":{},"任":{"df":0,"docs":{},"务":{"df":0,"docs":{},"。":{"df":0,"docs":{},"常":{"df":0,"docs":{},"见":{"df":0,"docs":{},"的":{"df":0,"docs":{},"这":{"df":0,"docs":{},"样":{"df":0,"docs":{},"的":{"df":0,"docs":{},"任":{"df":0,"docs":{},"务":{"df":0,"docs":{},"有":{"df":0,"docs":{},"：":{"df":0,"docs":{},"碰":{"df":0,"docs":{},"撞":{"df":0,"docs":{},"检":{"df":0,"docs":{},"测":{"df":0,"docs":{},"，":{"df":0,"docs":{},"一":{"df":0,"docs":{},"些":{"df":0,"docs":{},"全":{"df":0,"docs":{},"局":{"df":0,"docs":{},"的":{"df":0,"docs":{},"加":{"df":0,"docs":{},"速":{"df":0,"docs":{},"优":{"df":0,"docs":{},"化":{"df":0,"docs":{},"（":{"df":0,"docs":{},"原":{"df":0,"docs":{},"文":{"df":0,"docs":{},"g":{"df":0,"docs":{},"l":{"df":0,"docs":{},"o":{"b":{"df":1,"docs":{"3":{"tf":1.0}}},"df":0,"docs":{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}},"df":0,"docs":{}}}}},"计":{"df":0,"docs":{},"算":{"df":0,"docs":{},"，":{"df":0,"docs":{},"它":{"df":0,"docs":{},"就":{"df":0,"docs":{},"不":{"df":0,"docs":{},"像":{"df":0,"docs":{},"其":{"df":0,"docs":{},"他":{"df":0,"docs":{},"阶":{"df":0,"docs":{},"段":{"df":0,"docs":{},"一":{"df":0,"docs":{},"样":{"df":0,"docs":{},"可":{"df":0,"docs":{},"以":{"df":0,"docs":{},"拆":{"df":0,"docs":{},"分":{"df":0,"docs":{},"为":{"df":0,"docs":{},"子":{"df":0,"docs":{},"阶":{"df":0,"docs":{},"段":{"df":0,"docs":{},"。":{"df":0,"docs":{},"不":{"df":0,"docs":{},"过":{"df":0,"docs":{},"为":{"df":0,"docs":{},"了":{"df":0,"docs":{},"提":{"df":0,"docs":{},"高":{"df":0,"docs":{},"性":{"df":0,"docs":{},"能":{"df":0,"docs":{},"，":{"df":0,"docs":{},"此":{"df":0,"docs":{},"阶":{"df":0,"docs":{},"段":{"df":0,"docs":{},"通":{"df":0,"docs":{},"常":{"df":0,"docs":{},"在":{"df":0,"docs":{},"多":{"df":0,"docs":{},"个":{"df":0,"docs":{},"核":{"df":0,"docs":{},"上":{"df":0,"docs":{},"并":{"df":0,"docs":{},"行":{"df":0,"docs":{},"处":{"df":0,"docs":{},"理":{"df":0,"docs":{},"。":{"c":{"df":0,"docs":{},"p":{"df":0,"docs":{},"u":{"df":1,"docs":{"4":{"tf":1.0}}}}},"df":0,"docs":{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}},"df":0,"docs":{},"e":{"df":0,"docs":{},"y":{"df":1,"docs":{"6":{"tf":1.0}}}},"f":{"df":0,"docs":{},"p":{"df":1,"docs":{"3":{"tf":1.4142135623730951}}}},"g":{"df":0,"docs":{},"p":{"df":0,"docs":{},"u":{"df":3,"docs":{"3":{"tf":1.4142135623730951},"4":{"tf":1.0},"6":{"tf":1.7320508075688772}},"中":{"df":0,"docs":{},"的":{"df":0,"docs":{},"几":{"df":0,"docs":{},"何":{"df":0,"docs":{},"阶":{"df":0,"docs":{},"段":{"df":0,"docs":{},"负":{"df":0,"docs":{},"责":{"df":0,"docs":{},"大":{"df":0,"docs":{},"部":{"df":0,"docs":{},"分":{"df":0,"docs":{},"的":{"df":0,"docs":{},"逐":{"df":0,"docs":{},"三":{"df":0,"docs":{},"角":{"df":0,"docs":{},"形":{"df":0,"docs":{},"或":{"df":0,"docs":{},"逐":{"df":0,"docs":{},"顶":{"df":0,"docs":{},"点":{"df":0,"docs":{},"的":{"df":0,"docs":{},"计":{"df":0,"docs":{},"算":{"df":0,"docs":{},"。":{"df":0,"docs":{},"此":{"df":0,"docs":{},"阶":{"df":0,"docs":{},"段":{"df":0,"docs":{},"从":{"df":0,"docs":{},"功":{"df":0,"docs":{},"能":{"df":0,"docs":{},"上":{"df":0,"docs":{},"可":{"df":0,"docs":{},"分":{"df":0,"docs":{},"为":{"df":0,"docs":{},"：":{"df":0,"docs":{},"顶":{"df":0,"docs":{},"点":{"df":0,"docs":{},"着":{"df":0,"docs":{},"色":{"df":0,"docs":{},"，":{"df":0,"docs":{},"投":{"df":0,"docs":{},"影":{"df":0,"docs":{},"，":{"df":0,"docs":{},"裁":{"df":0,"docs":{},"剪":{"df":0,"docs":{},"，":{"df":0,"docs":{},"屏":{"df":0,"docs":{},"幕":{"df":0,"docs":{},"映":{"df":0,"docs":{},"射":{"df":0,"docs":{},"。":{"df":0,"docs":{},"见":{"df":0,"docs":{},"图":{"2":{".":{"3":{"df":1,"docs":{"5":{"tf":1.0}}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}},"来":{"df":0,"docs":{},"运":{"df":0,"docs":{},"算":{"df":0,"docs":{},"。":{"df":0,"docs":{},"因":{"df":0,"docs":{},"为":{"df":0,"docs":{},"g":{"df":0,"docs":{},"p":{"df":0,"docs":{},"u":{"df":1,"docs":{"4":{"tf":1.0}}}}}}}}}}}}}},"h":{"df":0,"docs":{},"z":{"df":1,"docs":{"3":{"tf":1.0}}}},"n":{"df":0,"docs":{},"级":{"df":0,"docs":{},"的":{"df":0,"docs":{},"流":{"df":0,"docs":{},"水":{"df":0,"docs":{},"线":{"df":0,"docs":{},"效":{"df":0,"docs":{},"率":{"df":0,"docs":{},"提":{"df":0,"docs":{},"升":{"df":0,"docs":{},"应":{"df":0,"docs":{},"当":{"df":0,"docs":{},"是":{"df":0,"docs":{},"没":{"df":0,"docs":{},"有":{"df":0,"docs":{},"流":{"df":0,"docs":{},"水":{"df":0,"docs":{},"化":{"df":0,"docs":{},"的":{"df":0,"docs":{},"n":{"df":1,"docs":{"3":{"tf":1.0}}}}}}}}}}}}}}}}}}}}}},"s":{"df":0,"docs":{},"h":{"a":{"d":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"df":1,"docs":{"4":{"tf":1.0}}}}},"df":0,"docs":{}},"df":0,"docs":{}},"p":{"a":{"c":{"df":0,"docs":{},"e":{"df":1,"docs":{"6":{"tf":1.0}}}},"df":0,"docs":{}},"df":0,"docs":{}}},"w":{"df":0,"docs":{},"之":{"df":0,"docs":{},"前":{"df":0,"docs":{},"，":{"df":0,"docs":{},"为":{"df":0,"docs":{},"了":{"df":0,"docs":{},"后":{"df":0,"docs":{},"续":{"df":0,"docs":{},"功":{"df":0,"docs":{},"能":{"df":0,"docs":{},"步":{"df":0,"docs":{},"骤":{"df":0,"docs":{},"和":{"df":0,"docs":{},"裁":{"df":0,"docs":{},"剪":{"df":0,"docs":{},"能":{"df":0,"docs":{},"正":{"df":0,"docs":{},"常":{"df":0,"docs":{},"工":{"df":0,"docs":{},"作":{"df":0,"docs":{},"，":{"df":0,"docs":{},"顶":{"df":0,"docs":{},"点":{"df":0,"docs":{},"着":{"df":0,"docs":{},"色":{"df":0,"docs":{},"器":{"df":0,"docs":{},"的":{"df":0,"docs":{},"输":{"df":0,"docs":{},"出":{"df":0,"docs":{},"必":{"df":0,"docs":{},"须":{"df":0,"docs":{},"是":{"df":0,"docs":{},"这":{"df":0,"docs":{},"个":{"df":0,"docs":{},"类":{"df":0,"docs":{},"型":{"df":0,"docs":{},"的":{"df":0,"docs":{},"（":{"df":0,"docs":{},"译":{"df":0,"docs":{},"注":{"df":0,"docs":{},"：":{"df":0,"docs":{},"v":{"df":0,"docs":{},"e":{"c":{"4":{"df":1,"docs":{"6":{"tf":1.0}}},"df":0,"docs":{}},"df":0,"docs":{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}},"z":{"df":0,"docs":{},"轴":{"df":0,"docs":{},"信":{"df":0,"docs":{},"息":{"df":0,"docs":{},"不":{"df":0,"docs":{},"是":{"df":0,"docs":{},"存":{"df":0,"docs":{},"储":{"df":0,"docs":{},"在":{"df":0,"docs":{},"图":{"df":0,"docs":{},"片":{"df":0,"docs":{},"里":{"df":0,"docs":{},"，":{"df":0,"docs":{},"而":{"df":0,"docs":{},"是":{"df":0,"docs":{},"在":{"df":0,"docs":{},"一":{"df":0,"docs":{},"个":{"df":0,"docs":{},"叫":{"df":0,"docs":{},"z":{"df":1,"docs":{"6":{"tf":1.0}}}}}}}}}}}}}}}}}}}},"方":{"df":0,"docs":{},"向":{"df":0,"docs":{},"拍":{"df":0,"docs":{},"摄":{"df":0,"docs":{},"，":{"df":0,"docs":{},"然":{"df":0,"docs":{},"后":{"df":0,"docs":{},"正":{"df":0,"docs":{},"y":{"df":0,"docs":{},"方":{"df":0,"docs":{},"向":{"df":0,"docs":{},"是":{"df":0,"docs":{},"上":{"df":0,"docs":{},"面":{"df":0,"docs":{},"，":{"df":0,"docs":{},"正":{"df":0,"docs":{},"x":{"df":0,"docs":{},"是":{"df":0,"docs":{},"右":{"df":0,"docs":{},"手":{"df":0,"docs":{},"边":{"df":0,"docs":{},"。":{"df":0,"docs":{},"这":{"df":0,"docs":{},"里":{"df":0,"docs":{},"使":{"df":0,"docs":{},"用":{"df":0,"docs":{},"负":{"df":0,"docs":{},"z":{"df":0,"docs":{},"方":{"df":0,"docs":{},"向":{"df":0,"docs":{},"，":{"df":0,"docs":{},"也":{"df":0,"docs":{},"有":{"df":0,"docs":{},"使":{"df":0,"docs":{},"用":{"df":0,"docs":{},"正":{"df":0,"docs":{},"z":{"df":0,"docs":{},"方":{"df":0,"docs":{},"向":{"df":0,"docs":{},"的":{"df":0,"docs":{},"，":{"df":0,"docs":{},"两":{"df":0,"docs":{},"种":{"df":0,"docs":{},"没":{"df":0,"docs":{},"什":{"df":0,"docs":{},"么":{"df":0,"docs":{},"大":{"df":0,"docs":{},"差":{"df":0,"docs":{},"别":{"df":0,"docs":{},"，":{"df":0,"docs":{},"相":{"df":0,"docs":{},"互":{"df":0,"docs":{},"变":{"df":0,"docs":{},"换":{"df":0,"docs":{},"也":{"df":0,"docs":{},"很":{"df":0,"docs":{},"容":{"df":0,"docs":{},"易":{"df":0,"docs":{},"。":{"df":0,"docs":{},"这":{"df":0,"docs":{},"里":{"df":0,"docs":{},"使":{"df":0,"docs":{},"用":{"df":0,"docs":{},"哪":{"df":0,"docs":{},"种":{"df":0,"docs":{},"位":{"df":0,"docs":{},"置":{"df":0,"docs":{},"和":{"df":0,"docs":{},"方":{"df":0,"docs":{},"向":{"df":0,"docs":{},"的":{"df":0,"docs":{},"定":{"df":0,"docs":{},"义":{"df":0,"docs":{},"取":{"df":0,"docs":{},"决":{"df":0,"docs":{},"于":{"df":0,"docs":{},"实":{"df":0,"docs":{},"际":{"df":0,"docs":{},"的":{"df":0,"docs":{},"图":{"df":0,"docs":{},"形":{"a":{"df":0,"docs":{},"p":{"df":0,"docs":{},"i":{"df":1,"docs":{"6":{"tf":1.0}}}}},"df":0,"docs":{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}},"breadcrumbs":{"root":{"1":{")":{"df":0,"docs":{},"到":{"(":{"1":{",":{"1":{",":{"1":{")":{"df":0,"docs":{},"。":{"df":0,"docs":{},"这":{"df":0,"docs":{},"个":{"df":0,"docs":{},"范":{"df":0,"docs":{},"围":{"df":0,"docs":{},"也":{"df":0,"docs":{},"是":{"df":0,"docs":{},"随":{"df":0,"docs":{},"意":{"df":0,"docs":{},"定":{"df":0,"docs":{},"义":{"df":0,"docs":{},"的":{"df":0,"docs":{},"，":{"df":0,"docs":{},"比":{"df":0,"docs":{},"如":{"df":0,"docs":{},"z":{"df":0,"docs":{},"可":{"df":0,"docs":{},"以":{"df":0,"docs":{},"定":{"df":0,"docs":{},"义":{"df":0,"docs":{},"成":{"df":0,"docs":{},"从":{"0":{"df":0,"docs":{},"到":{"1":{"df":1,"docs":{"6":{"tf":1.0}}},"df":0,"docs":{}}},"df":0,"docs":{}}}}}}}}}}}}}}}}}}}}}}}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}}},"8":{".":{"5":{"df":1,"docs":{"4":{"tf":1.0}}},"df":0,"docs":{}},"df":0,"docs":{}},"df":1,"docs":{"6":{"tf":1.4142135623730951}},"是":{"df":0,"docs":{},"计":{"df":0,"docs":{},"算":{"df":0,"docs":{},"所":{"df":0,"docs":{},"有":{"df":0,"docs":{},"顶":{"df":0,"docs":{},"点":{"df":0,"docs":{},"的":{"df":0,"docs":{},"位":{"df":0,"docs":{},"置":{"df":0,"docs":{},"，":{"2":{"df":1,"docs":{"6":{"tf":1.0}}},"df":0,"docs":{}}}}}}}}}}}}},"2":{".":{"1":{"df":2,"docs":{"2":{"tf":1.4142135623730951},"3":{"tf":1.4142135623730951}}},"2":{"df":2,"docs":{"3":{"tf":1.0},"4":{"tf":1.4142135623730951}}},"3":{".":{"1":{"df":1,"docs":{"6":{"tf":1.4142135623730951}}},"df":0,"docs":{}},"df":1,"docs":{"5":{"tf":1.7320508075688772}}},"4":{"df":1,"docs":{"6":{"tf":1.0}},"展":{"df":0,"docs":{},"示":{"df":0,"docs":{},"了":{"df":0,"docs":{},"一":{"df":0,"docs":{},"个":{"df":0,"docs":{},"定":{"df":0,"docs":{},"义":{"df":0,"docs":{},"的":{"df":0,"docs":{},"例":{"df":0,"docs":{},"子":{"df":0,"docs":{},"。":{"df":0,"docs":{},"模":{"df":0,"docs":{},"型":{"df":0,"docs":{},"变":{"df":0,"docs":{},"换":{"df":0,"docs":{},"和":{"df":0,"docs":{},"视":{"df":0,"docs":{},"口":{"df":0,"docs":{},"变":{"df":0,"docs":{},"换":{"df":0,"docs":{},"的":{"df":0,"docs":{},"实":{"df":0,"docs":{},"现":{"df":0,"docs":{},"都":{"df":0,"docs":{},"是":{"df":0,"docs":{},"使":{"df":0,"docs":{},"用":{"4":{"df":0,"docs":{},"x":{"4":{"df":1,"docs":{"6":{"tf":1.0}}},"df":0,"docs":{}}},"df":0,"docs":{}}}}}}}}}}}}}}}}}}}}}}}}}}}}},"5":{"df":1,"docs":{"6":{"tf":1.4142135623730951}}},"df":0,"docs":{}},"df":0,"docs":{}},"3":{"df":1,"docs":{"3":{"tf":1.0}}},"4":{".":{"4":{"df":1,"docs":{"6":{"tf":1.0}}},"7":{"df":1,"docs":{"6":{"tf":1.0}}},"df":0,"docs":{}},"df":3,"docs":{"2":{"tf":1.0},"3":{"tf":1.0},"5":{"tf":1.0}},"x":{"4":{"df":1,"docs":{"6":{"tf":1.0}}},"df":0,"docs":{}},"个":{"df":0,"docs":{},"阶":{"df":0,"docs":{},"段":{"df":0,"docs":{},"：":{"df":0,"docs":{},"应":{"df":0,"docs":{},"用":{"df":0,"docs":{},"程":{"df":0,"docs":{},"序":{"df":0,"docs":{},"，":{"df":0,"docs":{},"几":{"df":0,"docs":{},"何":{"df":0,"docs":{},"处":{"df":0,"docs":{},"理":{"df":0,"docs":{},"，":{"df":0,"docs":{},"光":{"df":0,"docs":{},"栅":{"df":0,"docs":{},"化":{"df":0,"docs":{},"，":{"df":0,"docs":{},"像":{"df":0,"docs":{},"素":{"df":0,"docs":{},"处":{"df":0,"docs":{},"理":{"df":0,"docs":{},"。":{"df":0,"docs":{},"见":{"df":0,"docs":{},"图":{"2":{".":{"2":{"df":1,"docs":{"3":{"tf":1.0}}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}}}}}}}}}}}}}}}}}}}}}}}}}}},"a":{"c":{"c":{"df":0,"docs":{},"e":{"df":0,"docs":{},"l":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"df":1,"docs":{"3":{"tf":1.0}}}}}}},"df":0,"docs":{}},"df":0,"docs":{},"l":{"df":0,"docs":{},"g":{"df":0,"docs":{},"o":{"df":0,"docs":{},"r":{"df":0,"docs":{},"i":{"df":0,"docs":{},"t":{"df":0,"docs":{},"h":{"df":0,"docs":{},"m":{"df":1,"docs":{"3":{"tf":1.0}}}}}}}}}}},"b":{"df":0,"docs":{},"u":{"df":0,"docs":{},"f":{"df":0,"docs":{},"f":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"df":1,"docs":{"6":{"tf":1.0}},"的":{"df":0,"docs":{},"地":{"df":0,"docs":{},"方":{"df":0,"docs":{},"，":{"df":0,"docs":{},"所":{"df":0,"docs":{},"以":{"df":0,"docs":{},"模":{"df":0,"docs":{},"型":{"df":0,"docs":{},"还":{"df":0,"docs":{},"是":{"df":0,"docs":{},"从":{"3":{"df":0,"docs":{},"维":{"df":0,"docs":{},"投":{"df":0,"docs":{},"影":{"df":0,"docs":{},"成":{"df":0,"docs":{},"了":{"2":{"df":0,"docs":{},"维":{"df":0,"docs":{},"。":{"df":0,"docs":{},"z":{"df":1,"docs":{"6":{"tf":1.0}}}}}},"df":0,"docs":{}}}}}}},"df":0,"docs":{}}}}}}}}}}}}}}}}}},"c":{"3":{"df":1,"docs":{"6":{"tf":1.0}}},"4":{"df":1,"docs":{"6":{"tf":1.7320508075688772}}},"5":{"df":1,"docs":{"6":{"tf":1.0}}},"df":0,"docs":{},"o":{"df":0,"docs":{},"m":{"df":0,"docs":{},"p":{"df":0,"docs":{},"u":{"df":0,"docs":{},"t":{"df":1,"docs":{"4":{"tf":1.0}}}}}}},"p":{"df":0,"docs":{},"u":{"df":1,"docs":{"4":{"tf":1.0}},"上":{"df":0,"docs":{},"实":{"df":0,"docs":{},"现":{"df":0,"docs":{},"。":{"c":{"df":0,"docs":{},"p":{"df":0,"docs":{},"u":{"df":0,"docs":{},"通":{"df":0,"docs":{},"常":{"df":0,"docs":{},"是":{"df":0,"docs":{},"多":{"df":0,"docs":{},"核":{"df":0,"docs":{},"的":{"df":0,"docs":{},"，":{"df":0,"docs":{},"具":{"df":0,"docs":{},"有":{"df":0,"docs":{},"并":{"df":0,"docs":{},"行":{"df":0,"docs":{},"处":{"df":0,"docs":{},"理":{"df":0,"docs":{},"的":{"df":0,"docs":{},"能":{"df":0,"docs":{},"力":{"df":0,"docs":{},"。":{"df":0,"docs":{},"因":{"df":0,"docs":{},"此":{"df":0,"docs":{},"适":{"df":0,"docs":{},"合":{"df":0,"docs":{},"处":{"df":0,"docs":{},"理":{"df":0,"docs":{},"应":{"df":0,"docs":{},"用":{"df":0,"docs":{},"阶":{"df":0,"docs":{},"段":{"df":0,"docs":{},"的":{"df":0,"docs":{},"各":{"df":0,"docs":{},"种":{"df":0,"docs":{},"各":{"df":0,"docs":{},"样":{"df":0,"docs":{},"的":{"df":0,"docs":{},"任":{"df":0,"docs":{},"务":{"df":0,"docs":{},"。":{"df":0,"docs":{},"常":{"df":0,"docs":{},"见":{"df":0,"docs":{},"的":{"df":0,"docs":{},"这":{"df":0,"docs":{},"样":{"df":0,"docs":{},"的":{"df":0,"docs":{},"任":{"df":0,"docs":{},"务":{"df":0,"docs":{},"有":{"df":0,"docs":{},"：":{"df":0,"docs":{},"碰":{"df":0,"docs":{},"撞":{"df":0,"docs":{},"检":{"df":0,"docs":{},"测":{"df":0,"docs":{},"，":{"df":0,"docs":{},"一":{"df":0,"docs":{},"些":{"df":0,"docs":{},"全":{"df":0,"docs":{},"局":{"df":0,"docs":{},"的":{"df":0,"docs":{},"加":{"df":0,"docs":{},"速":{"df":0,"docs":{},"优":{"df":0,"docs":{},"化":{"df":0,"docs":{},"（":{"df":0,"docs":{},"原":{"df":0,"docs":{},"文":{"df":0,"docs":{},"g":{"df":0,"docs":{},"l":{"df":0,"docs":{},"o":{"b":{"df":1,"docs":{"3":{"tf":1.0}}},"df":0,"docs":{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}},"df":0,"docs":{}}}}},"计":{"df":0,"docs":{},"算":{"df":0,"docs":{},"，":{"df":0,"docs":{},"它":{"df":0,"docs":{},"就":{"df":0,"docs":{},"不":{"df":0,"docs":{},"像":{"df":0,"docs":{},"其":{"df":0,"docs":{},"他":{"df":0,"docs":{},"阶":{"df":0,"docs":{},"段":{"df":0,"docs":{},"一":{"df":0,"docs":{},"样":{"df":0,"docs":{},"可":{"df":0,"docs":{},"以":{"df":0,"docs":{},"拆":{"df":0,"docs":{},"分":{"df":0,"docs":{},"为":{"df":0,"docs":{},"子":{"df":0,"docs":{},"阶":{"df":0,"docs":{},"段":{"df":0,"docs":{},"。":{"df":0,"docs":{},"不":{"df":0,"docs":{},"过":{"df":0,"docs":{},"为":{"df":0,"docs":{},"了":{"df":0,"docs":{},"提":{"df":0,"docs":{},"高":{"df":0,"docs":{},"性":{"df":0,"docs":{},"能":{"df":0,"docs":{},"，":{"df":0,"docs":{},"此":{"df":0,"docs":{},"阶":{"df":0,"docs":{},"段":{"df":0,"docs":{},"通":{"df":0,"docs":{},"常":{"df":0,"docs":{},"在":{"df":0,"docs":{},"多":{"df":0,"docs":{},"个":{"df":0,"docs":{},"核":{"df":0,"docs":{},"上":{"df":0,"docs":{},"并":{"df":0,"docs":{},"行":{"df":0,"docs":{},"处":{"df":0,"docs":{},"理":{"df":0,"docs":{},"。":{"c":{"df":0,"docs":{},"p":{"df":0,"docs":{},"u":{"df":1,"docs":{"4":{"tf":1.0}}}}},"df":0,"docs":{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}},"df":0,"docs":{},"e":{"df":0,"docs":{},"y":{"df":1,"docs":{"6":{"tf":1.0}}}},"f":{"df":0,"docs":{},"p":{"df":1,"docs":{"3":{"tf":1.4142135623730951}}}},"g":{"df":0,"docs":{},"p":{"df":0,"docs":{},"u":{"df":3,"docs":{"3":{"tf":1.4142135623730951},"4":{"tf":1.0},"6":{"tf":1.7320508075688772}},"中":{"df":0,"docs":{},"的":{"df":0,"docs":{},"几":{"df":0,"docs":{},"何":{"df":0,"docs":{},"阶":{"df":0,"docs":{},"段":{"df":0,"docs":{},"负":{"df":0,"docs":{},"责":{"df":0,"docs":{},"大":{"df":0,"docs":{},"部":{"df":0,"docs":{},"分":{"df":0,"docs":{},"的":{"df":0,"docs":{},"逐":{"df":0,"docs":{},"三":{"df":0,"docs":{},"角":{"df":0,"docs":{},"形":{"df":0,"docs":{},"或":{"df":0,"docs":{},"逐":{"df":0,"docs":{},"顶":{"df":0,"docs":{},"点":{"df":0,"docs":{},"的":{"df":0,"docs":{},"计":{"df":0,"docs":{},"算":{"df":0,"docs":{},"。":{"df":0,"docs":{},"此":{"df":0,"docs":{},"阶":{"df":0,"docs":{},"段":{"df":0,"docs":{},"从":{"df":0,"docs":{},"功":{"df":0,"docs":{},"能":{"df":0,"docs":{},"上":{"df":0,"docs":{},"可":{"df":0,"docs":{},"分":{"df":0,"docs":{},"为":{"df":0,"docs":{},"：":{"df":0,"docs":{},"顶":{"df":0,"docs":{},"点":{"df":0,"docs":{},"着":{"df":0,"docs":{},"色":{"df":0,"docs":{},"，":{"df":0,"docs":{},"投":{"df":0,"docs":{},"影":{"df":0,"docs":{},"，":{"df":0,"docs":{},"裁":{"df":0,"docs":{},"剪":{"df":0,"docs":{},"，":{"df":0,"docs":{},"屏":{"df":0,"docs":{},"幕":{"df":0,"docs":{},"映":{"df":0,"docs":{},"射":{"df":0,"docs":{},"。":{"df":0,"docs":{},"见":{"df":0,"docs":{},"图":{"2":{".":{"3":{"df":1,"docs":{"5":{"tf":1.0}}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}},"来":{"df":0,"docs":{},"运":{"df":0,"docs":{},"算":{"df":0,"docs":{},"。":{"df":0,"docs":{},"因":{"df":0,"docs":{},"为":{"df":0,"docs":{},"g":{"df":0,"docs":{},"p":{"df":0,"docs":{},"u":{"df":1,"docs":{"4":{"tf":1.0}}}}}}}}}}}}}},"h":{"df":0,"docs":{},"z":{"df":1,"docs":{"3":{"tf":1.0}}}},"n":{"df":0,"docs":{},"级":{"df":0,"docs":{},"的":{"df":0,"docs":{},"流":{"df":0,"docs":{},"水":{"df":0,"docs":{},"线":{"df":0,"docs":{},"效":{"df":0,"docs":{},"率":{"df":0,"docs":{},"提":{"df":0,"docs":{},"升":{"df":0,"docs":{},"应":{"df":0,"docs":{},"当":{"df":0,"docs":{},"是":{"df":0,"docs":{},"没":{"df":0,"docs":{},"有":{"df":0,"docs":{},"流":{"df":0,"docs":{},"水":{"df":0,"docs":{},"化":{"df":0,"docs":{},"的":{"df":0,"docs":{},"n":{"df":1,"docs":{"3":{"tf":1.0}}}}}}}}}}}}}}}}}}}}}},"s":{"df":0,"docs":{},"h":{"a":{"d":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"df":1,"docs":{"4":{"tf":1.0}}}}},"df":0,"docs":{}},"df":0,"docs":{}},"p":{"a":{"c":{"df":0,"docs":{},"e":{"df":1,"docs":{"6":{"tf":1.0}}}},"df":0,"docs":{}},"df":0,"docs":{}}},"w":{"df":0,"docs":{},"之":{"df":0,"docs":{},"前":{"df":0,"docs":{},"，":{"df":0,"docs":{},"为":{"df":0,"docs":{},"了":{"df":0,"docs":{},"后":{"df":0,"docs":{},"续":{"df":0,"docs":{},"功":{"df":0,"docs":{},"能":{"df":0,"docs":{},"步":{"df":0,"docs":{},"骤":{"df":0,"docs":{},"和":{"df":0,"docs":{},"裁":{"df":0,"docs":{},"剪":{"df":0,"docs":{},"能":{"df":0,"docs":{},"正":{"df":0,"docs":{},"常":{"df":0,"docs":{},"工":{"df":0,"docs":{},"作":{"df":0,"docs":{},"，":{"df":0,"docs":{},"顶":{"df":0,"docs":{},"点":{"df":0,"docs":{},"着":{"df":0,"docs":{},"色":{"df":0,"docs":{},"器":{"df":0,"docs":{},"的":{"df":0,"docs":{},"输":{"df":0,"docs":{},"出":{"df":0,"docs":{},"必":{"df":0,"docs":{},"须":{"df":0,"docs":{},"是":{"df":0,"docs":{},"这":{"df":0,"docs":{},"个":{"df":0,"docs":{},"类":{"df":0,"docs":{},"型":{"df":0,"docs":{},"的":{"df":0,"docs":{},"（":{"df":0,"docs":{},"译":{"df":0,"docs":{},"注":{"df":0,"docs":{},"：":{"df":0,"docs":{},"v":{"df":0,"docs":{},"e":{"c":{"4":{"df":1,"docs":{"6":{"tf":1.0}}},"df":0,"docs":{}},"df":0,"docs":{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}},"z":{"df":0,"docs":{},"轴":{"df":0,"docs":{},"信":{"df":0,"docs":{},"息":{"df":0,"docs":{},"不":{"df":0,"docs":{},"是":{"df":0,"docs":{},"存":{"df":0,"docs":{},"储":{"df":0,"docs":{},"在":{"df":0,"docs":{},"图":{"df":0,"docs":{},"片":{"df":0,"docs":{},"里":{"df":0,"docs":{},"，":{"df":0,"docs":{},"而":{"df":0,"docs":{},"是":{"df":0,"docs":{},"在":{"df":0,"docs":{},"一":{"df":0,"docs":{},"个":{"df":0,"docs":{},"叫":{"df":0,"docs":{},"z":{"df":1,"docs":{"6":{"tf":1.0}}}}}}}}}}}}}}}}}}}},"方":{"df":0,"docs":{},"向":{"df":0,"docs":{},"拍":{"df":0,"docs":{},"摄":{"df":0,"docs":{},"，":{"df":0,"docs":{},"然":{"df":0,"docs":{},"后":{"df":0,"docs":{},"正":{"df":0,"docs":{},"y":{"df":0,"docs":{},"方":{"df":0,"docs":{},"向":{"df":0,"docs":{},"是":{"df":0,"docs":{},"上":{"df":0,"docs":{},"面":{"df":0,"docs":{},"，":{"df":0,"docs":{},"正":{"df":0,"docs":{},"x":{"df":0,"docs":{},"是":{"df":0,"docs":{},"右":{"df":0,"docs":{},"手":{"df":0,"docs":{},"边":{"df":0,"docs":{},"。":{"df":0,"docs":{},"这":{"df":0,"docs":{},"里":{"df":0,"docs":{},"使":{"df":0,"docs":{},"用":{"df":0,"docs":{},"负":{"df":0,"docs":{},"z":{"df":0,"docs":{},"方":{"df":0,"docs":{},"向":{"df":0,"docs":{},"，":{"df":0,"docs":{},"也":{"df":0,"docs":{},"有":{"df":0,"docs":{},"使":{"df":0,"docs":{},"用":{"df":0,"docs":{},"正":{"df":0,"docs":{},"z":{"df":0,"docs":{},"方":{"df":0,"docs":{},"向":{"df":0,"docs":{},"的":{"df":0,"docs":{},"，":{"df":0,"docs":{},"两":{"df":0,"docs":{},"种":{"df":0,"docs":{},"没":{"df":0,"docs":{},"什":{"df":0,"docs":{},"么":{"df":0,"docs":{},"大":{"df":0,"docs":{},"差":{"df":0,"docs":{},"别":{"df":0,"docs":{},"，":{"df":0,"docs":{},"相":{"df":0,"docs":{},"互":{"df":0,"docs":{},"变":{"df":0,"docs":{},"换":{"df":0,"docs":{},"也":{"df":0,"docs":{},"很":{"df":0,"docs":{},"容":{"df":0,"docs":{},"易":{"df":0,"docs":{},"。":{"df":0,"docs":{},"这":{"df":0,"docs":{},"里":{"df":0,"docs":{},"使":{"df":0,"docs":{},"用":{"df":0,"docs":{},"哪":{"df":0,"docs":{},"种":{"df":0,"docs":{},"位":{"df":0,"docs":{},"置":{"df":0,"docs":{},"和":{"df":0,"docs":{},"方":{"df":0,"docs":{},"向":{"df":0,"docs":{},"的":{"df":0,"docs":{},"定":{"df":0,"docs":{},"义":{"df":0,"docs":{},"取":{"df":0,"docs":{},"决":{"df":0,"docs":{},"于":{"df":0,"docs":{},"实":{"df":0,"docs":{},"际":{"df":0,"docs":{},"的":{"df":0,"docs":{},"图":{"df":0,"docs":{},"形":{"a":{"df":0,"docs":{},"p":{"df":0,"docs":{},"i":{"df":1,"docs":{"6":{"tf":1.0}}}}},"df":0,"docs":{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}},"title":{"root":{"2":{".":{"1":{"df":1,"docs":{"3":{"tf":1.0}}},"2":{"df":1,"docs":{"4":{"tf":1.0}}},"3":{".":{"1":{"df":1,"docs":{"6":{"tf":1.0}}},"df":0,"docs":{}},"df":1,"docs":{"5":{"tf":1.0}}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}}}},"lang":"English","pipeline":["trimmer","stopWordFilter","stemmer"],"ref":"id","version":"0.9.5"},"results_options":{"limit_results":30,"teaser_word_count":30},"search_options":{"bool":"OR","expand":true,"fields":{"body":{"boost":1},"breadcrumbs":{"boost":1},"title":{"boost":2}}}});