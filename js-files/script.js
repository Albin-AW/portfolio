const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const intervals = new Map()

document.querySelectorAll('h1').forEach(h1 => {
    // store the original text once
    h1.dataset.originalText = h1.innerText

    h1.addEventListener('mouseover', event => { 
        const target = event.target
        const originalText = target.dataset.originalText // always use the stored version
        
        let iteration = 0

        // stop any running animation on this target
        if (intervals.has(target)) {
            clearInterval(intervals.get(target))
            target.innerText = originalText // reset to original before restarting
        }

        const interval = setInterval(() => { 
            target.innerText = originalText
            .split('')
            .map((letter, index) => {         
            
            if (index < iteration) {
                return originalText[index]
            }
            return letters[Math.floor(Math.random() * 26)]
            })
            .join('')

            if (iteration >= originalText.length) { 
                clearInterval(interval)
                intervals.delete(target)
                target.innerText = originalText // ensure final text is correct
            }

            iteration += 1 / 3
        }, 30)
        intervals.set(target, interval)
    })
})
