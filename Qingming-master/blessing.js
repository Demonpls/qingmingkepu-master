// 默认祝福语列表
const defaultBlessings = [
    "清明时节雨纷纷，路上行人欲断魂",
    "慎终追远，民德归厚",
    "清明时节，追思先人",
    "慎终追远，缅怀先人",
    "清明时节，寄托哀思",
    "慎终追远，传承美德",
    "清明时节，缅怀先烈",
    "慎终追远，铭记历史",
    "清明时节，寄托思念",
    "慎终追远，传承文化",
    "清明时节，追思故人",
    "慎终追远，缅怀英烈",
    "清明时节，寄托哀思",
    "慎终追远，传承精神",
    "清明时节，缅怀先贤",
    "慎终追远，铭记恩德",
    "清明时节，寄托思念",
    "慎终追远，传承文明",
    "清明时节，追思亲人",
    "慎终追远，缅怀先辈",
    "清明时节，寄托哀思",
    "慎终追远，传承美德",
    "清明时节，缅怀英烈",
    "慎终追远，铭记历史",
    "清明时节，寄托思念",
    "慎终追远，传承文化",
    "清明时节，追思故人",
    "慎终追远，缅怀先人",
    "清明时节，寄托哀思",
    "慎终追远，传承精神",
    "清明时节，缅怀先贤",
    "慎终追远，铭记恩德",
    "清明时节，寄托思念",
    "慎终追远，传承文明",
    "清明时节，追思亲人",
    "慎终追远，缅怀先辈",
    "清明时节，寄托哀思",
    "慎终追远，传承美德",
    "清明时节，缅怀英烈",
    "慎终追远，铭记历史",
    "清明时节，寄托思念",
    "慎终追远，传承文化",
    "清明时节，追思故人",
    "慎终追远，缅怀先人",
    "清明时节，寄托哀思",
    "慎终追远，传承精神",
    "清明时节，缅怀先贤",
    "慎终追远，铭记恩德",
    "清明时节，寄托思念",
    "慎终追远，传承文明",
    "清明时节，追思亲人",
    "慎终追远，缅怀先辈"
];

// 弹幕类
class Danmaku {
    constructor(text, container) {
        this.element = document.createElement('div');
        this.element.className = 'blessing-item';
        this.element.textContent = text;
        
        // 随机颜色，使用更浅的颜色
        const colors = [
            'rgba(44, 85, 48, 0.4)',  // 浅绿色
            'rgba(139, 195, 74, 0.4)', // 浅黄绿色
            'rgba(76, 175, 80, 0.4)',  // 浅青绿色
            'rgba(67, 160, 71, 0.4)',  // 浅深绿色
            'rgba(56, 142, 60, 0.4)',  // 浅墨绿色
            'rgba(27, 94, 32, 0.4)',   // 浅暗绿色
            'rgba(13, 71, 161, 0.4)',  // 浅蓝色
            'rgba(33, 150, 243, 0.4)', // 浅天蓝色
            'rgba(0, 105, 92, 0.4)',   // 浅青色
            'rgba(0, 150, 136, 0.4)'   // 浅碧色
        ];
        this.element.style.color = colors[Math.floor(Math.random() * colors.length)];
        
        // 随机动画持续时间
        const duration = 20 + Math.random() * 10;
        this.element.style.animationDuration = `${duration}s`;
        
        // 随机延迟
        this.element.style.animationDelay = `${Math.random() * 5}s`;
        
        container.appendChild(this.element);
    }

    show() {
        document.querySelector('.blessing-messages').appendChild(this.element);
        this.element.addEventListener('animationend', () => {
            this.element.remove();
        });
    }
}

// 弹幕管理器
class DanmakuManager {
    constructor() {
        this.blessings = [...defaultBlessings];
        this.isRunning = false;
        this.interval = null;
        this.maxDanmaku = 30;
        this.userBlessings = []; // 存储用户提交的祝福
    }

    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        
        // 根据屏幕宽度调整弹幕发送频率
        const frequency = window.innerWidth > 768 ? 3000 : 4000;
        
        this.interval = setInterval(() => {
            const currentDanmaku = document.querySelectorAll('.blessing-item').length;
            
            if (currentDanmaku < this.maxDanmaku) {
                // 优先显示用户提交的祝福
                let blessing;
                if (this.userBlessings.length > 0) {
                    blessing = this.userBlessings.shift(); // 获取并移除第一个用户祝福
                } else {
                    blessing = this.blessings[Math.floor(Math.random() * this.blessings.length)];
                }
                const danmaku = new Danmaku(blessing, document.querySelector('.blessing-messages'));
                danmaku.show();
            }
        }, frequency);
    }

    stop() {
        if (!this.isRunning) return;
        this.isRunning = false;
        clearInterval(this.interval);
    }

    addBlessing(text) {
        if (text.trim()) {
            // 将用户祝福添加到队列中
            this.userBlessings.push(text);
            // 立即显示一条用户祝福
            const danmaku = new Danmaku(text, document.querySelector('.blessing-messages'));
            danmaku.show();
        }
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    const manager = new DanmakuManager();
    manager.start();

    // 处理表单提交
    const form = document.querySelector('.blessing-form');
    const input = document.getElementById('blessing-input');
    const submitBtn = document.getElementById('submit-blessing');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if (text) {
            manager.addBlessing(text);
            input.value = '';
        }
    });

    submitBtn.addEventListener('click', () => {
        const text = input.value.trim();
        if (text) {
            manager.addBlessing(text);
            input.value = '';
        }
    });

    // 添加输入框动画效果
    input.addEventListener('focus', () => {
        input.style.transform = 'scale(1.02)';
    });

    input.addEventListener('blur', () => {
        input.style.transform = 'scale(1)';
    });

    // 页面可见性变化时控制弹幕
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            manager.stop();
        } else {
            manager.start();
        }
    });
}); 