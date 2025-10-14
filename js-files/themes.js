
    /*
    ################################
    ######## Theme Settings ########
    ################################
    */

document.addEventListener('DOMContentLoaded', () => {
    const body = document.body
    const themeButtons = document.querySelectorAll('.theme-btn')
    const themeContainer = document.querySelector('.theme-container')
    const cog = document.querySelector('.theme-cog')

    // loads theme - default white
    let savedTheme = localStorage.getItem('theme') || 'WHITE'
    setTheme(savedTheme)
    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const theme = button.getAttribute('data-theme')
            setTheme(theme)
            localStorage.setItem('theme', theme)
        })
    })

    // toggle theme menu 
    cog.addEventListener('click', () => {
        themeContainer.classList.toggle('active')
    })

    // sets theme
    function setTheme(theme) {
        body.setAttribute('data-theme', theme)
        themeButtons.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-theme') === theme)
        })
    }
})

