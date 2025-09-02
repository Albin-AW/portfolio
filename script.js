const lines = [
  { element: document.getElementById('line-1'), text: "INITIALIZING CORE MODULES..." },
  { element: document.getElementById('line-2'), text: "LOADING ENVIRONMENT VARIABLES..." },
  { element: document.getElementById('line-3'), text: "SECURITY PROTOCOLS: ONLINE." },
  { element: document.getElementById('line-4'), text: "DEFENCE SYSTEM: ACTIVATED." },
  { element: document.getElementById('line-5'), text: "ALL SYSTEMS NOMINAL." },
  { element: document.getElementById('line-6'), text: "INITIALIZATION COMPLETE." },
  { element: document.getElementById('line-7'), text: "AWAITING USER AUTHENTICATION..." },
  { element: document.getElementById('line-8'), text: "USER LOGIN REQUIRED" },
  { element: document.getElementById('line-9'), text: "PASSWORD: ", mode: "input" } 
]


const speed = 1

let inputEnabled = false
let inputTarget = null
let inputCursor = null
let resume = null   

function typeLine(lineIndex)
{
        // stop writing if at the end
    if (lineIndex >= lines.length)
    {
        return
    } 

    const line = lines[lineIndex]
    const textContainer = line.element.querySelector('.console-text-container')

    const cursor = document.createElement('span')
    cursor.classList.add('cursor')
    textContainer.appendChild(cursor)

    let i = 0
    function typeNextLetter()
    {
            // insert next letter
        cursor.insertAdjacentText('beforebegin', line.text[i])
        i++

        if (i < line.text.length)
        {
            setTimeout(typeNextLetter, speed)
        }
        else
        {
            if (line.mode === 'input')
            {
                    // prepear user input
                const inputSpan = document.createElement('span')
                inputSpan.className = 'console-input'
                cursor.insertAdjacentElement('beforebegin', inputSpan)

                inputTarget = inputSpan
                inputCursor = cursor
                inputEnabled = true

                    // store how to continue when user presses Enter
                resume = function()
                {
                    inputEnabled = false
                    inputCursor.remove()
                    typeLine(lineIndex + 1)
                }
            return  
            }

                // stop at last line
            // if (lineIndex === lines.length - 1)
            // {
            //     return
            // }

            setTimeout(() =>
            {
                cursor.remove()
                typeLine(lineIndex + 1)
            }, 800)
        }
    }   
    typeNextLetter()
}

setTimeout(() =>
{
    typeLine(0)
}, 800)

document.addEventListener('keydown', e =>
{
    // Block typing until the prompt is fully printed
    if (inputEnabled == false) 
    {
        return
    }

    if (e.key === 'Backspace')
    {
        e.preventDefault()
        if (inputTarget.textContent.length > 0)
        {
            inputTarget.textContent = inputTarget.textContent.slice(0, -1)
        }
        return
    }

    if (e.key === 'Enter')
    {
        e.preventDefault()
        const value = inputTarget.textContent
            // console verification
        console.log('Entered password:', value)

        // TODO: show ACCESS DENIED, glitch, etc.
        if (typeof resume === 'function') resume()
        {
            return
        }
    }

        // Type only printable characters
    if (e.key.length === 1)
    {
        e.preventDefault()
        inputTarget.textContent += e.key
    }
})

    // positional css
document.querySelectorAll('.console-container').forEach((line, i) =>
{
    line.style.top = `${i * 2.4}em`
})
