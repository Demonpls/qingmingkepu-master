class Leaf {
    constructor() {
        this.element = document.createElement('div');
        this.element.className = 'leaf';
        const size = Math.random() * 15 + 8;
        this.element.style.width = `${size}px`;
        this.element.style.height = `${size}px`;
        
        // 从页面中间位置开始
        this.element.style.left = '50vw';
        this.element.style.top = '-20px';
        this.element.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        // 降低下落速度使摆动更明显
        this.speed = Math.random() * 0.3 + 0.2;
        
        // 只向右飘落，增加摆动自然度
        this.swing = Math.random() * 2 + 1;
        this.phase = Math.random() * Math.PI * 2;
        
        // 增加旋转动画
        this.rotationSpeed = (Math.random() * 2 - 1) * 0.5;
        this.rotation = Math.random() * 360;
        
        this.element.style.opacity = Math.random() * 0.3 + 0.2;
        document.body.appendChild(this.element);
    }
    
    fall() {
        const currentTop = parseFloat(this.element.style.top);
        const currentLeft = parseFloat(this.element.style.left);
        
        // 更新位置
        this.element.style.top = `${currentTop + this.speed}px`;
        
        // 使用正弦和余弦函数组合产生更自然的摆动
        const spread = (currentTop / window.innerHeight) * 8;
        const swingOffset = (
            Math.sin(currentTop / 30 + this.phase) * this.swing + 
            Math.cos(currentTop / 45) * this.swing * 0.5 +
            spread
        );
        this.element.style.left = `${currentLeft + swingOffset * 0.15}px`;
        
        // 旋转效果
        this.rotation += this.rotationSpeed;
        this.element.style.transform = `rotate(${this.rotation}deg)`;
        
        if (currentTop > window.innerHeight) {
            this.element.style.top = '-20px';
            this.element.style.left = '50vw';
            this.swing = Math.random() * 2 + 1;
            this.phase = Math.random() * Math.PI * 2;
            this.rotation = Math.random() * 360;
        }
    }
}

const leaves = [];
const numLeaves = 35; // 增加树叶数量

// 延迟创建树叶，使其分布更均匀
for (let i = 0; i < numLeaves; i++) {
    setTimeout(() => {
        leaves.push(new Leaf());
    }, i * 100); // 缩短间隔时间
}

function animate() {
    leaves.forEach(leaf => leaf.fall());
    requestAnimationFrame(animate);
}

animate(); 