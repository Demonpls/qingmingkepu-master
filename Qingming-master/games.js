// 游戏数据
const gameData = {
    poetry: {
        title: "清明诗词拼图",
        poem: "清明时节雨纷纷，路上行人欲断魂。借问酒家何处有，牧童遥指杏花村。",
        author: "杜牧"
    },
    matching: {
        pairs: [
            { custom: "扫墓祭祖", description: "慎终追远，缅怀先人" },
            { custom: "踏青郊游", description: "亲近自然，感受春意" },
            { custom: "放风筝", description: "寄托思念，放飞心情" },
            { custom: "插柳枝", description: "驱邪纳福，祈求平安" }
        ]
    }
};

// 游戏相关变量
let currentGame = null;
const modal = document.getElementById('game-modal');
const gameContainer = document.getElementById('game-container');
const closeBtn = document.querySelector('.close');

// 关闭按钮事件
closeBtn.onclick = function() {
    if (currentGame) {
        currentGame.destroy();
        currentGame = null;
    }
    modal.style.display = "none";
}

// 点击模态框外部关闭
window.onclick = function(event) {
    if (event.target == modal) {
        if (currentGame) {
            currentGame.destroy();
            currentGame = null;
        }
        modal.style.display = "none";
    }
}

// 诗词拼图游戏
function startPuzzleGame() {
    if (currentGame) {
        currentGame.destroy();
    }
    modal.style.display = "block";
    currentGame = new PuzzleGame();
    currentGame.init();
}

// 连连看游戏
function startMatchingGame() {
    if (currentGame) {
        currentGame.destroy();
    }
    modal.style.display = "block";
    currentGame = new MatchingGame();
    currentGame.init();
}

// 场景拼图游戏
function startScenePuzzle() {
    if (currentGame) {
        currentGame.destroy();
    }
    modal.style.display = "block";
    currentGame = new ScenePuzzleGame();
    currentGame.init();
}

// 故事演绎游戏
function startStoryGame() {
    if (currentGame) {
        currentGame.destroy();
    }
    modal.style.display = "block";
    currentGame = new StoryGame();
    currentGame.init();
}

// 涂色游戏
function startColoringGame() {
    if (currentGame) {
        currentGame.destroy();
    }
    modal.style.display = "block";
    currentGame = new ColoringGame();
    currentGame.init();
}

// 基础游戏类
class BaseGame {
    constructor() {
        this.container = gameContainer;
        this.isPlaying = false;
    }

    init() {
        this.container.innerHTML = '';
        this.createHeader();
        this.createGameUI();
        this.isPlaying = true;
    }

    createHeader() {
        const header = document.createElement('div');
        header.className = 'game-header';
        
        const title = document.createElement('h3');
        title.textContent = this.getGameTitle();
        
        const exitBtn = document.createElement('button');
        exitBtn.className = 'btn btn-danger';
        exitBtn.textContent = '退出游戏';
        exitBtn.onclick = () => {
            if (confirm('确定要退出游戏吗？当前进度将不会保存。')) {
                modal.style.display = "none";
                this.destroy();
                currentGame = null;
            }
        };
        
        header.appendChild(title);
        header.appendChild(exitBtn);
        this.container.appendChild(header);
    }

    getGameTitle() {
        return '游戏';
    }

    destroy() {
        this.container.innerHTML = '';
        this.isPlaying = false;
    }

    updateProgress(percent) {
        const progressElement = this.container.querySelector('.progress');
        if (progressElement) {
            progressElement.style.width = `${percent}%`;
        }
    }
}

// 诗词拼图游戏类
class PuzzleGame extends BaseGame {
    constructor() {
        super();
    }

    getGameTitle() {
        return '清明诗词接龙';
    }

    createGameUI() {
        const gameUI = document.createElement('div');
        gameUI.className = 'puzzle-game';
        
        // 创建游戏说明
        const instructions = document.createElement('div');
        instructions.className = 'game-instructions';
        instructions.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <h2 style="color: #4CAF50; margin-bottom: 20px;">🎉 更多内容敬请期待！</h2>
                <p style="font-size: 18px; color: #666; margin-bottom: 15px;">清明诗词接龙游戏正在开发中...</p>
                <p style="font-size: 16px; color: #888;">敬请期待更多精彩内容！</p>
            </div>
        `;
        gameUI.appendChild(instructions);

        // 创建控制按钮
        const controls = document.createElement('div');
        controls.className = 'game-controls';
        
        const backBtn = document.createElement('button');
        backBtn.className = 'btn btn-primary';
        backBtn.textContent = '返回主页';
        backBtn.onclick = () => {
            modal.style.display = "none";
            this.destroy();
            currentGame = null;
        };
        
        controls.appendChild(backBtn);
        gameUI.appendChild(controls);

        this.container.appendChild(gameUI);
        this.isPlaying = true;
    }

    destroy() {
        this.container.innerHTML = '';
        this.isPlaying = false;
    }
}

// 连连看游戏类
class MatchingGame extends BaseGame {
    constructor() {
        super();
        this.pairs = [
            { custom: '扫墓祭祖', desc: '慎终追远，缅怀先人' },
            { custom: '踏青郊游', desc: '亲近自然，感受春意' },
            { custom: '放风筝', desc: '寄托思念，放飞心情' },
            { custom: '插柳枝', desc: '驱邪纳福，祈求平安' },
            { custom: '寒食节', desc: '禁火冷食，纪念介子推' },
            { custom: '上巳节', desc: '祓禊踏青，驱除不祥' }
        ];
        this.selectedCards = [];
        this.matchedPairs = 0;
    }

    getGameTitle() {
        return '清明习俗连连看';
    }

    createGameUI() {
        const gameUI = document.createElement('div');
        gameUI.className = 'matching-game';
        
        // 创建游戏说明
        const instructions = document.createElement('div');
        instructions.className = 'game-instructions';
        instructions.innerHTML = `
            <p>请将清明习俗与其含义配对。</p>
            <p>每对配对正确将获得50分。</p>
            <p>提示：仔细阅读习俗和含义的描述。</p>
        `;
        gameUI.appendChild(instructions);

        // 创建配对区域
        const matchingArea = document.createElement('div');
        matchingArea.className = 'matching-area';
        
        // 创建所有卡片
        const allCards = [...this.pairs, ...this.pairs].map((pair, index) => ({
            ...pair,
            id: index,
            type: index < this.pairs.length ? 'custom' : 'desc'
        }));
        
        // 随机打乱卡片
        const shuffledCards = allCards.sort(() => Math.random() - 0.5);
        
        shuffledCards.forEach(card => {
            const cardElement = this.createCard(card);
            matchingArea.appendChild(cardElement);
        });

        gameUI.appendChild(matchingArea);

        // 创建控制按钮
        const controls = document.createElement('div');
        controls.className = 'game-controls';
        
        const resetBtn = document.createElement('button');
        resetBtn.className = 'btn btn-secondary';
        resetBtn.textContent = '重新开始';
        resetBtn.onclick = () => this.resetGame();
        
        controls.appendChild(resetBtn);
        gameUI.appendChild(controls);

        this.container.appendChild(gameUI);
        this.isPlaying = true;
    }

    createCard(card) {
        const cardElement = document.createElement('div');
        cardElement.className = `card ${card.type}-card`;
        cardElement.textContent = card.type === 'custom' ? card.custom : card.desc;
        cardElement.dataset.id = card.id;
        cardElement.dataset.type = card.type;
        cardElement.onclick = () => this.selectCard(cardElement);
        return cardElement;
    }

    selectCard(cardElement) {
        if (!this.isPlaying || cardElement.classList.contains('matched') || 
            this.selectedCards.includes(cardElement)) return;

        cardElement.classList.add('selected');
        this.selectedCards.push(cardElement);

        if (this.selectedCards.length === 2) {
            this.checkMatch();
        }
    }

    checkMatch() {
        const [card1, card2] = this.selectedCards;
        const id1 = parseInt(card1.dataset.id);
        const id2 = parseInt(card2.dataset.id);
        const type1 = card1.dataset.type;
        const type2 = card2.dataset.type;

        if (type1 !== type2 && Math.abs(id1 - id2) === this.pairs.length) {
            // 匹配成功
            card1.classList.remove('selected');
            card2.classList.remove('selected');
            card1.classList.add('matched');
            card2.classList.add('matched');
            this.matchedPairs++;

            const message = `
✨ 配对成功！

📝 当前配对：
${type1 === 'custom' ? card1.textContent : card2.textContent} - ${type1 === 'custom' ? card2.textContent : card1.textContent}

🎯 继续加油，完成剩余配对！
`;
            alert(message);

            if (this.matchedPairs === this.pairs.length) {
                this.gameComplete();
            }
        } else {
            // 匹配失败
            const message = `
❌ 配对失败

💡 提示：
- 请确保选择的是习俗和其对应的含义
- 仔细阅读文字内容
- 注意配对的逻辑关系

🔄 请重新选择！
`;
            alert(message);
            setTimeout(() => {
                card1.classList.remove('selected');
                card2.classList.remove('selected');
            }, 1000);
        }

        this.selectedCards = [];
    }

    gameComplete() {
        this.isPlaying = false;
        const message = `
🎉 恭喜你完成所有配对！

📋 配对结果：
${this.pairs.map(pair => `✅ ${pair.custom} - ${pair.desc}`).join('\n')}

🏆 游戏成绩：
- 完成配对：${this.matchedPairs}对
- 正确率：100%

💡 小贴士：
清明习俗承载着中华民族的文化记忆，让我们继续传承下去。
`;
        alert(message);
        modal.style.display = "none";
        this.destroy();
        currentGame = null;
    }

    resetGame() {
        this.destroy();
        this.init();
    }
}

// 场景拼图游戏类
class ScenePuzzleGame extends BaseGame {
    constructor() {
        super();
        this.gridSize = 3;
        this.tiles = [];
        this.moves = 0;
        this.maxMoves = 50;
        this.imageUrl = 'images/g1.jpg';
        this.draggedTile = null;
        this.dragStartX = 0;
        this.dragStartY = 0;
    }

    getGameTitle() {
        return '清明场景拼图';
    }

    createGameUI() {
        const gameUI = document.createElement('div');
        gameUI.className = 'scene-puzzle-game';
        
        // 创建游戏说明
        const instructions = document.createElement('div');
        instructions.className = 'game-instructions';
        instructions.innerHTML = `
            <p>请将打乱的清明场景图片拖拽到正确位置。</p>
            <p>每步移动将消耗1点移动次数。</p>
            <p>提示：注意图片的连续性，合理规划移动路线。</p>
            <p>剩余移动次数：${this.maxMoves - this.moves}</p>
        `;
        gameUI.appendChild(instructions);

        // 创建拼图区域
        const puzzleArea = document.createElement('div');
        puzzleArea.className = 'puzzle-area';
        
        // 创建拼图块
        for (let i = 0; i < this.gridSize * this.gridSize; i++) {
            const tile = document.createElement('div');
            tile.className = 'puzzle-tile';
            tile.dataset.index = i;
            tile.draggable = true;
            
            // 计算每个拼图块的位置
            const row = Math.floor(i / this.gridSize);
            const col = i % this.gridSize;
            const x = col * 100;
            const y = row * 100;
            
            tile.style.backgroundImage = `url('${this.imageUrl}')`;
            tile.style.backgroundPosition = `${-x}% ${-y}%`;
            
            // 添加拖拽事件监听器
            tile.addEventListener('dragstart', (e) => this.handleDragStart(e, tile));
            tile.addEventListener('dragend', (e) => this.handleDragEnd(e, tile));
            tile.addEventListener('dragover', (e) => this.handleDragOver(e, tile));
            tile.addEventListener('drop', (e) => this.handleDrop(e, tile));
            
            puzzleArea.appendChild(tile);
            this.tiles.push(tile);
        }

        gameUI.appendChild(puzzleArea);

        // 创建控制按钮
        const controls = document.createElement('div');
        controls.className = 'game-controls';
        
        const resetBtn = document.createElement('button');
        resetBtn.className = 'btn btn-secondary';
        resetBtn.textContent = '重新开始';
        resetBtn.onclick = () => this.resetGame();
        
        controls.appendChild(resetBtn);
        gameUI.appendChild(controls);

        this.container.appendChild(gameUI);
        this.shuffleTiles();
        this.isPlaying = true;
    }

    handleDragStart(e, tile) {
        if (!this.isPlaying) return;
        this.draggedTile = tile;
        tile.classList.add('dragging');
        this.dragStartX = e.clientX;
        this.dragStartY = e.clientY;
    }

    handleDragEnd(e, tile) {
        if (!this.isPlaying) return;
        tile.classList.remove('dragging');
        this.draggedTile = null;
    }

    handleDragOver(e, tile) {
        if (!this.isPlaying) return;
        e.preventDefault();
        if (tile !== this.draggedTile) {
            tile.classList.add('drag-over');
        }
    }

    handleDrop(e, tile) {
        if (!this.isPlaying) return;
        e.preventDefault();
        tile.classList.remove('drag-over');

        if (tile !== this.draggedTile) {
            this.moves++;
            const movesDisplay = this.container.querySelector('.game-instructions p:last-child');
            movesDisplay.textContent = `剩余移动次数：${this.maxMoves - this.moves}`;

            // 交换位置
            const tileOrder = this.draggedTile.style.order;
            this.draggedTile.style.order = tile.style.order;
            tile.style.order = tileOrder;

            if (this.checkWin()) {
                this.gameComplete();
            } else if (this.moves >= this.maxMoves) {
                this.gameOver();
            }
        }
    }

    shuffleTiles() {
        const positions = Array.from({length: this.gridSize * this.gridSize}, (_, i) => i);
        for (let i = positions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [positions[i], positions[j]] = [positions[j], positions[i]];
        }
        
        this.tiles.forEach((tile, index) => {
            tile.style.order = positions[index];
        });
    }

    checkWin() {
        return this.tiles.every((tile, index) => parseInt(tile.style.order) === index);
    }

    gameComplete() {
        this.isPlaying = false;
        const score = Math.max(0, 100 - this.moves * 2);
        this.updateProgress(100);
        const message = `
🎉 恭喜你完成清明场景拼图！

🏆 游戏成绩：
- 移动次数：${this.moves}次
- 剩余步数：${this.maxMoves - this.moves}步
- 最终得分：${score}分

💡 小贴士：
- 清明时节，踏青赏景，感受春天的美好
- 合理规划路线可以节省步数
- 继续挑战，创造更好的成绩！

🎯 期待你的下一次挑战！
`;
        alert(message);
        modal.style.display = "none";
        this.destroy();
        currentGame = null;
    }

    gameOver() {
        this.isPlaying = false;
        const message = `
❌ 游戏结束

📊 游戏统计：
- 已用步数：${this.moves}步
- 剩余步数：0步
- 最终得分：${this.score}分

💡 小贴士：
- 注意规划移动路线
- 观察图片的连续性
- 合理利用移动次数
- 可以尝试不同的移动策略

🔄 点击"重新开始"再试一次！
`;
        alert(message);
        modal.style.display = "none";
        this.destroy();
        currentGame = null;
    }

    resetGame() {
        this.destroy();
        this.init();
    }
}

// 故事演绎游戏类
class StoryGame extends BaseGame {
    constructor() {
        super();
        this.stories = [
            {
                title: '介子推的故事',
                content: '春秋时期，晋文公重耳流亡在外，介子推割下自己的肉煮汤给他喝。后来重耳即位，想要报答介子推，但介子推已经隐居山林。重耳派人放火烧山，想要逼他出来，但介子推宁愿被烧死也不愿出山。',
                choices: [
                    { text: '放火烧山', next: 'bad', score: 0 },
                    { text: '派人寻找', next: 'good', score: 50 }
                ]
            },
            {
                title: '寒食节的由来',
                content: '为了纪念介子推，晋文公下令在他死后的这一天，全国禁止生火，只能吃冷食。这就是寒食节的由来。',
                choices: [
                    { text: '继续吃热食', next: 'bad', score: 0 },
                    { text: '遵守寒食习俗', next: 'good', score: 50 }
                ]
            },
            {
                title: '清明踏青',
                content: '清明时节，春光明媚，正是踏青的好时节。小明和家人一起去郊外踏青，看到满山遍野的杏花，心情愉悦。',
                choices: [
                    { text: '采摘杏花', next: 'bad', score: 0 },
                    { text: '拍照留念', next: 'good', score: 50 }
                ]
            },
            {
                title: '扫墓祭祖',
                content: '清明节这天，小华和家人一起去扫墓。他们带着鲜花和祭品，怀着崇敬的心情祭拜先人。',
                choices: [
                    { text: '随意摆放祭品', next: 'bad', score: 0 },
                    { text: '认真整理祭品', next: 'good', score: 50 }
                ]
            },
            {
                title: '放风筝',
                content: '清明时节，春风和煦，是放风筝的好时候。小芳和同学们在操场上放风筝，风筝在蓝天中翱翔。',
                choices: [
                    { text: '在电线杆附近放风筝', next: 'bad', score: 0 },
                    { text: '选择空旷场地放风筝', next: 'good', score: 50 }
                ]
            },
            {
                title: '插柳枝',
                content: '清明时节，人们有插柳枝的习俗。小李和家人一起在门前插上柳枝，祈求平安。',
                choices: [
                    { text: '随意折断柳枝', next: 'bad', score: 0 },
                    { text: '小心采摘柳枝', next: 'good', score: 50 }
                ]
            }
        ];
        this.currentStory = 0;
    }

    getGameTitle() {
        return '清明故事演绎';
    }

    createGameUI() {
        const gameUI = document.createElement('div');
        gameUI.className = 'story-game';
        
        // 创建游戏说明
        const instructions = document.createElement('div');
        instructions.className = 'game-instructions';
        instructions.innerHTML = `
            <p>请根据故事情节做出选择。</p>
            <p>每个选择都会影响故事的发展和得分。</p>
            <p>提示：仔细思考每个选择的影响。</p>
            <p>当前进度：${this.currentStory + 1}/${this.stories.length}</p>
        `;
        gameUI.appendChild(instructions);

        this.showStory();
        this.container.appendChild(gameUI);
        this.isPlaying = true;
    }

    showStory() {
        const story = this.stories[this.currentStory];
        const storyArea = document.createElement('div');
        storyArea.className = 'story-area';

        const title = document.createElement('h3');
        title.textContent = story.title;
        storyArea.appendChild(title);

        const content = document.createElement('div');
        content.className = 'story-text';
        content.textContent = story.content;
        storyArea.appendChild(content);

        const options = document.createElement('div');
        options.className = 'options-container';

        story.choices.forEach(choice => {
            const button = document.createElement('button');
            button.className = 'btn btn-primary';
            button.textContent = choice.text;
            button.onclick = () => this.makeChoice(choice);
            options.appendChild(button);
        });

        storyArea.appendChild(options);
        this.container.appendChild(storyArea);
    }

    makeChoice(choice) {
        this.updateProgress((this.currentStory + 1) / this.stories.length * 100);

        if (choice.next === 'good') {
            const message = `
✨ 做出了正确的选择！

📝 当前故事：
${this.stories[this.currentStory].title}

💡 你的选择：
${choice.text}

🎯 继续加油，完成下一个故事！
`;
            alert(message);
        } else {
            const message = `
❌ 这个选择可能不太合适。

📝 当前故事：
${this.stories[this.currentStory].title}

💡 你的选择：
${choice.text}

🔄 请重新思考，做出更好的选择！
`;
            alert(message);
        }

        this.currentStory++;
        if (this.currentStory < this.stories.length) {
            this.container.innerHTML = '';
            this.createGameUI();
        } else {
            this.gameComplete();
        }
    }

    gameComplete() {
        this.isPlaying = false;
        const message = `
🎉 故事演绎完成！

📚 故事回顾：
${this.stories.map(story => `
《${story.title}》
${story.content}
`).join('\n')}

🏆 游戏成绩：
- 完成故事：${this.stories.length}个
- 正确率：100%

💡 小贴士：
清明故事承载着中华民族的传统美德，让我们继续传承下去。
`;
        alert(message);
        modal.style.display = "none";
        this.destroy();
        currentGame = null;
    }

    resetGame() {
        this.destroy();
        this.init();
    }
}

// 涂色游戏类
class ColoringGame extends BaseGame {
    constructor() {
        super();
        this.canvas = null;
        this.ctx = null;
        this.colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
        this.currentColor = '#FF0000';
        this.brushSize = 5;
        this.isDrawing = false;
        this.lastX = 0;
        this.lastY = 0;
    }

    getGameTitle() {
        return '清明主题涂色';
    }

    createGameUI() {
        const gameUI = document.createElement('div');
        gameUI.className = 'coloring-game';
        
        // 创建游戏说明
        const instructions = document.createElement('div');
        instructions.className = 'game-instructions';
        instructions.innerHTML = `
            <p>请为清明主题的线稿涂上美丽的颜色。</p>
            <p>使用不同的颜色创造独特的清明画作。</p>
            <p>提示：注意颜色的搭配和层次感。</p>
        `;
        gameUI.appendChild(instructions);

        // 创建画布区域
        const canvasArea = document.createElement('div');
        canvasArea.className = 'canvas-area';
        
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'coloring-canvas';
        this.canvas.width = 400;
        this.canvas.height = 400;
        
        // 初始化画布
        this.ctx = this.canvas.getContext('2d');
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 设置初始画笔样式
        this.ctx.strokeStyle = this.currentColor;
        this.ctx.lineWidth = this.brushSize;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        
        canvasArea.appendChild(this.canvas);
        gameUI.appendChild(canvasArea);

        // 创建颜色选择器
        const colorPicker = document.createElement('div');
        colorPicker.className = 'color-picker';
        
        this.colors.forEach(color => {
            const colorBtn = document.createElement('button');
            colorBtn.className = 'color-btn';
            colorBtn.style.backgroundColor = color;
            if (color === this.currentColor) {
                colorBtn.classList.add('active');
            }
            colorBtn.onclick = () => this.setColor(color);
            colorPicker.appendChild(colorBtn);
        });

        gameUI.appendChild(colorPicker);

        // 创建画笔大小控制
        const brushControl = document.createElement('div');
        brushControl.className = 'brush-control';
        
        const sizeLabel = document.createElement('label');
        sizeLabel.textContent = '画笔大小：';
        
        const sizeInput = document.createElement('input');
        sizeInput.type = 'range';
        sizeInput.min = '1';
        sizeInput.max = '20';
        sizeInput.value = this.brushSize;
        sizeInput.onchange = (e) => this.setBrushSize(parseInt(e.target.value));
        
        brushControl.appendChild(sizeLabel);
        brushControl.appendChild(sizeInput);
        gameUI.appendChild(brushControl);

        // 创建控制按钮
        const controls = document.createElement('div');
        controls.className = 'game-controls';
        
        const saveBtn = document.createElement('button');
        saveBtn.className = 'btn btn-primary';
        saveBtn.textContent = '保存作品';
        saveBtn.onclick = () => this.saveArtwork();
        
        const resetBtn = document.createElement('button');
        resetBtn.className = 'btn btn-secondary';
        resetBtn.textContent = '重新开始';
        resetBtn.onclick = () => this.resetGame();
        
        controls.appendChild(saveBtn);
        controls.appendChild(resetBtn);
        gameUI.appendChild(controls);

        this.container.appendChild(gameUI);
        this.setupEventListeners();
        this.isPlaying = true;
    }

    setupEventListeners() {
        this.canvas.addEventListener('mousedown', (e) => this.startDrawing(e));
        this.canvas.addEventListener('mousemove', (e) => this.draw(e));
        this.canvas.addEventListener('mouseup', () => this.stopDrawing());
        this.canvas.addEventListener('mouseout', () => this.stopDrawing());
        this.canvas.addEventListener('touchstart', (e) => this.handleTouchStart(e));
        this.canvas.addEventListener('touchmove', (e) => this.handleTouchMove(e));
        this.canvas.addEventListener('touchend', () => this.stopDrawing());
    }

    startDrawing(e) {
        this.isDrawing = true;
        const rect = this.canvas.getBoundingClientRect();
        this.lastX = e.clientX - rect.left;
        this.lastY = e.clientY - rect.top;
        this.draw(e);
    }

    draw(e) {
        if (!this.isDrawing) return;

        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        this.ctx.beginPath();
        this.ctx.moveTo(this.lastX, this.lastY);
        this.ctx.lineTo(x, y);
        this.ctx.stroke();

        this.lastX = x;
        this.lastY = y;
    }

    handleTouchStart(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = this.canvas.getBoundingClientRect();
        this.lastX = touch.clientX - rect.left;
        this.lastY = touch.clientY - rect.top;
        this.isDrawing = true;
    }

    handleTouchMove(e) {
        e.preventDefault();
        if (!this.isDrawing) return;

        const touch = e.touches[0];
        const rect = this.canvas.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;

        this.ctx.beginPath();
        this.ctx.moveTo(this.lastX, this.lastY);
        this.ctx.lineTo(x, y);
        this.ctx.stroke();

        this.lastX = x;
        this.lastY = y;
    }

    stopDrawing() {
        this.isDrawing = false;
    }

    setColor(color) {
        this.currentColor = color;
        this.ctx.strokeStyle = color;
        
        // 更新颜色按钮的激活状态
        const colorButtons = this.container.querySelectorAll('.color-btn');
        colorButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.style.backgroundColor === color) {
                btn.classList.add('active');
            }
        });
    }

    setBrushSize(size) {
        this.brushSize = size;
        this.ctx.lineWidth = size;
    }

    saveArtwork() {
        const link = document.createElement('a');
        link.download = '清明涂色作品.png';
        link.href = this.canvas.toDataURL();
        link.click();
        this.gameComplete();
    }

    gameComplete() {
        this.isPlaying = false;
        const message = `
🎨 恭喜你完成涂色作品！

🏆 游戏成绩：
- 完成度：100%
- 正确率：100%

💡 小贴士：
- 你的作品已保存为"清明涂色作品.png"
- 清明时节，用画笔描绘春天的美好
- 继续创作，展现你的艺术天赋！

🎯 期待你的下一幅作品！
`;
        alert(message);
        modal.style.display = "none";
        this.destroy();
        currentGame = null;
    }

    resetGame() {
        this.destroy();
        this.init();
    }
}

// 添加游戏重置功能
function resetGame() {
    const currentGame = gameContainer.querySelector('h3').textContent;
    if (currentGame.includes('诗词拼图')) {
        startPuzzleGame();
    } else if (currentGame.includes('连连看')) {
        startMatchingGame();
    } else if (currentGame.includes('场景拼图')) {
        startScenePuzzle();
    } else if (currentGame.includes('故事演绎')) {
        startStoryGame();
    } else if (currentGame.includes('涂色')) {
        startColoringGame();
    }
}

// 添加键盘快捷键支持
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        modal.style.display = "none";
    } else if (e.key === 'r' && modal.style.display === "block") {
        resetGame();
    }
});

function checkScenePuzzle() {
    // 实现场景拼图的检查逻辑
    alert('场景拼图功能正在开发中...');
} 