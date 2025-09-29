// 公共JavaScript函数库

// 情绪相关常量和工具函数
const EMOTIONS = {
    ANXIETY: '焦虑',
    TENSION: '紧张',
    UNEASE: '不安',
    LONELINESS: '孤独',
    DEPRESSION: '沮丧',
    PRESSURE: '压力'
};

const EMOTION_COLORS = {
    '焦虑': '#F59E0B',
    '紧张': '#EF4444',
    '不安': '#8B5CF6',
    '孤独': '#06B6D4',
    '沮丧': '#6B7280',
    '压力': '#10B981'
};

const EMOTION_ICONS = {
    '焦虑': 'fas fa-exclamation-triangle',
    '紧张': 'fas fa-bolt',
    '不安': 'fas fa-question-circle',
    '孤独': 'fas fa-user',
    '沮丧': 'fas fa-cloud-rain',
    '压力': 'fas fa-weight-hanging'
};

// 日期工具函数
const DateUtils = {
    formatDate(date) {
        return date.toISOString().split('T')[0];
    },

    formatTime(date) {
        return date.toTimeString().split(' ')[0].slice(0, 5);
    },

    formatDateTime(date) {
        return `${this.formatDate(date)} ${this.formatTime(date)}`;
    },

    isToday(dateString) {
        const today = new Date().toISOString().split('T')[0];
        return dateString === today;
    },

    isThisWeek(dateString) {
        const date = new Date(dateString);
        const today = new Date();
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        return date >= weekAgo && date <= today;
    },

    isThisMonth(dateString) {
        const date = new Date(dateString);
        const today = new Date();
        return date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
    }
};

// LocalStorage 工具函数
const StorageUtils = {
    get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error(`读取localStorage失败: ${key}`, error);
            return defaultValue;
        }
    },

    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error(`写入localStorage失败: ${key}`, error);
            return false;
        }
    },

    remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error(`删除localStorage失败: ${key}`, error);
            return false;
        }
    },

    clear() {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('清空localStorage失败', error);
            return false;
        }
    }
};

// UI 工具函数
const UIUtils = {
    showToast(message, duration = 2000, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg text-white font-medium z-50 transition-all duration-300 ${
            type === 'success' ? 'bg-green-500' :
            type === 'error' ? 'bg-red-500' :
            type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
        }`;
        toast.textContent = message;
        toast.style.opacity = '0';

        document.body.appendChild(toast);

        // 显示动画
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translate(-50%, 0)';
        }, 10);

        // 隐藏动画
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translate(-50%, -20px)';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, duration);
    },

    showModal(content, title = '', actions = []) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';

        const modalContent = document.createElement('div');
        modalContent.className = 'bg-white rounded-lg p-6 max-w-md w-full mx-4';

        if (title) {
            const titleElement = document.createElement('h3');
            titleElement.className = 'text-lg font-semibold mb-4';
            titleElement.textContent = title;
            modalContent.appendChild(titleElement);
        }

        const contentElement = document.createElement('div');
        contentElement.className = 'mb-4';
        contentElement.innerHTML = content;
        modalContent.appendChild(contentElement);

        if (actions.length > 0) {
            const actionsContainer = document.createElement('div');
            actionsContainer.className = 'flex justify-end space-x-2';

            actions.forEach(action => {
                const button = document.createElement('button');
                button.className = `px-4 py-2 rounded ${action.class || 'bg-gray-300'}`;
                button.textContent = action.text;
                button.onclick = () => {
                    if (action.handler) action.handler();
                    document.body.removeChild(modal);
                };
                actionsContainer.appendChild(button);
            });

            modalContent.appendChild(actionsContainer);
        }

        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        // 点击背景关闭
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });

        return modal;
    },

    getEmotionColor(emotion) {
        return EMOTION_COLORS[emotion] || '#64748B';
    },

    getEmotionIcon(emotion) {
        return EMOTION_ICONS[emotion] || 'fas fa-heart';
    }
};

// 动画工具函数
const AnimationUtils = {
    fadeIn(element, duration = 300) {
        element.style.opacity = '0';
        element.style.display = 'block';

        const fadeEffect = setInterval(() => {
            if (!element.style.opacity) {
                element.style.opacity = 0;
            }
            if (element.style.opacity < 1) {
                element.style.opacity = parseFloat(element.style.opacity) + 0.1;
            } else {
                clearInterval(fadeEffect);
            }
        }, duration / 10);
    },

    fadeOut(element, duration = 300) {
        const fadeEffect = setInterval(() => {
            if (!element.style.opacity) {
                element.style.opacity = 1;
            }
            if (element.style.opacity > 0) {
                element.style.opacity -= 0.1;
            } else {
                clearInterval(fadeEffect);
                element.style.display = 'none';
            }
        }, duration / 10);
    },

    slideUp(element, duration = 300) {
        element.style.transition = `all ${duration}ms ease`;
        element.style.transform = 'translateY(0)';
        element.style.opacity = '1';
    },

    slideDown(element, duration = 300) {
        element.style.transition = `all ${duration}ms ease`;
        element.style.transform = 'translateY(20px)';
        element.style.opacity = '0';
    }
};

// 数据验证工具函数
const ValidationUtils = {
    isValidEmotion(emotion) {
        return Object.values(EMOTIONS).includes(emotion);
    },

    isValidDate(dateString) {
        const date = new Date(dateString);
        return date instanceof Date && !isNaN(date);
    },

    sanitizeInput(input) {
        if (typeof input !== 'string') return input;
        return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    }
};

// 导出到全局作用域
window.EMOTIONS = EMOTIONS;
window.EMOTION_COLORS = EMOTION_COLORS;
window.EMOTION_ICONS = EMOTION_ICONS;
window.DateUtils = DateUtils;
window.StorageUtils = StorageUtils;
window.UIUtils = UIUtils;
window.AnimationUtils = AnimationUtils;
window.ValidationUtils = ValidationUtils;