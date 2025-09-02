const lines = 
[
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

const deniedLines =
[
    { element: document.getElementById('line-1'), text: "TEST1" },
]

const speed = 1

let inputEnabled = false
let inputTarget = null
let inputCursor = null
let resume = null   

function typeLine(lineIndex) 
{
    if (lineIndex >= lines.length) 
    {
        return
    }
    typeTextLine(lines[lineIndex], () => typeLine(lineIndex + 1))
}

setTimeout(() =>
{
    typeLine(0)
}, 800)

document.addEventListener('keydown', function(event)
{
    let key = event.key

    if (inputEnabled == false)
    {     
        return
    }

    if (key == 'Backspace')
    {
        event.preventDefault()
        if (inputTarget.textContent.length > 0)
        {
            inputTarget.textContent = inputTarget.textContent.slice(0, -1)
        }
    }
    else if (key == 'Enter')
    {
        event.preventDefault()
        const value = inputTarget.textContent
        console.log('Entered password:', value)

        denied()
    }
    else if (key.length === 1)
    {
        event.preventDefault()
        inputTarget.textContent += key
    }
})

function denied() 
{
    inputEnabled = false
    if (inputCursor == true)
    {
        inputCursor.remove()
    }

        // clear all previous text
    document.querySelectorAll('.console-text-container').forEach(container => 
    {
        container.textContent = ''
    })

        // type denied lines
        // STOLEN CODE: REDO
    let deniedIndex = 0
    function nextDenied() 
    {
        if (deniedIndex >= deniedLines.length) return
        // Mark last denied line for cursor
        const isLast = deniedIndex === deniedLines.length - 1
        typeTextLine(
            { ...deniedLines[deniedIndex], mode: isLast ? 'denied-last' : undefined },
            () => {
                deniedIndex++;
                nextDenied();
            }
        );
    }
    nextDenied();
}


    // position lines
document.querySelectorAll('.console-container').forEach((line, i) =>
{
    line.style.top = `${i * 2}em`
})

function typeTextLine({ element, text, mode }, onDone) 
{
    const textContainer = element.querySelector('.console-text-container')
    const cursor = document.createElement('span')
    cursor.classList.add('cursor')
    textContainer.appendChild(cursor)

    let i = 0;
    function typeNextLetter() 
    {
        cursor.insertAdjacentText('beforebegin', text[i])
        i++
        if (i < text.length) 
        {
            setTimeout(typeNextLetter, speed);
        } 
        else 
        {
            if (mode === 'input') 
            {
                    // prepare user input
                const inputSpan = document.createElement('span');
                inputSpan.className = 'console-input';
                cursor.insertAdjacentElement('beforebegin', inputSpan);

                inputTarget = inputSpan;
                inputCursor = cursor;
                inputEnabled = true;

                    // store how to continue when user presses Enter
                resume = function () 
                {
                    inputEnabled = false
                    inputCursor.remove()
                    if (onDone) onDone()
                }
                return
            }
            setTimeout(() => 
            {
                  // remove cursor if not last line
                if (!mode || mode !== 'denied-last') 
                {
                    cursor.remove();
                }
                if (onDone) onDone();
            }, 800);
        }
    }
    typeNextLetter();
}
