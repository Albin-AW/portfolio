document.addEventListener('DOMContentLoaded', () => {
    const body = document.body
    const themeBtn = document.getElementById('theme-btn')

    // load saved theme (default WHITE)
    let currentTheme = localStorage.getItem('theme') || 'WHITE'
    setTheme(currentTheme)

    themeBtn.addEventListener('click', () => {
        currentTheme = currentTheme === 'WHITE' ? 'BLACK' : 'WHITE'
        setTheme(currentTheme)
        localStorage.setItem('theme', currentTheme)
    })

    function setTheme(theme) {
        body.setAttribute('data-theme', theme)
        themeBtn.textContent = theme === 'WHITE' ? '🌙' : '☀️'
    }
})
