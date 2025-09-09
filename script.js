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

    function resetConsole() 
    {
        inputEnabled = false
        if (inputCursor == true) 
        {
            inputCursor.remove()
        }
        document.querySelectorAll('.console-text-container').forEach(container => 
        {
            container.textContent = ''
        })
    }

    function typeLines(list) 
    {
        let index = 0

        function next() 
        {
            if (index >= list.length) 
            {
                return
            }

            let line = list[index]
            let last = index
            index === list.length - 1

            if (last == true) 
            {
                line.mode = 'denied-last'
            }

                // type the current line
            typeTextLine(line, function() 
            {
                index++
                next()
            })
        }

        next()
    }

    setTimeout(() =>
    {
        typeLines(lines)
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
        resetConsole()
        typeLines(deniedLines)
    }

        // position lines
    document.querySelectorAll('.console-container').forEach((line, i) =>
    {
        line.style.top = `${i * 2}em`
    })

    function typeTextLine(line, onDone) 
    {
            // extract info
        let element = line.element
        let text = line.text
        let mode = line.mode

        const textContainer = element.querySelector('.console-text-container')
        const cursor = document.createElement('span')
        cursor.classList.add('cursor')
        textContainer.appendChild(cursor)

        let i = 0
        function typeNextLetter() 
        {
            cursor.insertAdjacentText('beforebegin', text[i])
            i++
            if (i < text.length) 
            {
                setTimeout(typeNextLetter, speed)
            } 
            else 
            {
                if (mode === 'input') 
                {
                    let inputSpan = document.createElement('span')
                    inputSpan.className = 'console-input'
                    cursor.insertAdjacentElement('beforebegin', inputSpan)

                    inputTarget = inputSpan
                    inputCursor = cursor
                    inputEnabled = true
                    return
                }

                setTimeout(() => 
                {
                    if (mode !== 'denied-last') 
                    {
                        cursor.remove()
                    }
                    if (onDone)
                    {
                        onDone()
                    } 
                }, 800)
            }
        }
        typeNextLetter()
    }
