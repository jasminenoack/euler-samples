function setupSimple(max, buttonSelector, equationSelector, stepsSelector, intervalLength, optimizeMemory, optimizeNumbers) {
    var interval;
    var valueList = [];

    var button = document.getElementById(buttonSelector)
    var equation = document.getElementById(equationSelector)
    var stepsElement = document.getElementById(stepsSelector)

    function clearCurrentInterval() {
        clearInterval(interval)
        interval = null

    }

    button.addEventListener('click', () => {
        valueList = [];
        if (interval) {
            clearCurrentInterval()
        } else {
            var current = 0
            var current3 = 0, current5 = 0
            stepsElement.innerHTML = '';
            equation.innerHTML = '';

            function nextCurrent() {
                if (optimizeNumbers) {
                    if (current3 <= current5) {
                        current3 += 3
                        current = current3
                    } else {
                        current5 += 5
                        current = current5
                    }
                    if (current3 === current5) {
                        nextCurrent()
                    }
                    while(current >= max && (current3 < max || current5 < max)) {
                        nextCurrent()
                    }
                } else {
                    current++
                }
            }

            nextCurrent()
            var current3 = 3;
            var current5 = 0;

            function nextSimple() {
                var html = ''
                if (optimizeMemory && valueList.length === 2) {
                    const firstNum = valueList.shift()
                    valueList[0] = valueList[0] + firstNum
                    html += '<p>' + valueList[0] + ' is the sum of the first 2 numbers.</p>'
                }

                if (current >= max) {
                    var simpleOutcome = 0;
                    valueList.forEach((num) => {
                        simpleOutcome += num
                    })
                    html += '<p>' + simpleOutcome + ' is the total of these numbers.</p>'
                    clearCurrentInterval()
                } else if (current % 3 === 0 || current % 5 === 0) {
                    valueList.push(current)
                    html += '<p>' + current + ' is divisible by 3 or 5 add it to the equation.</p>'
                } else {
                    html += '<p>' + current + ' is not divisible by 3 or 5 ignore it.</p>'
                }
                var innerString = valueList.join(' + ')
                if (simpleOutcome) {
                    innerString += " = " + simpleOutcome
                }
                equation.innerHTML = "<p>" + innerString + "</p>"

                stepsElement.innerHTML = html
                nextCurrent()
            }
            nextSimple()
            interval = setInterval(nextSimple, intervalLength)
        }
    })
}

// setup super simple
setupSimple(10, 'simple', 'simple-equation', 'simple-steps', 1000)
setupSimple(100, 'simple-100', 'simple-equation-100', 'simple-steps-100', 500)
setupSimple(1000, 'simple-1000', 'simple-equation-1000', 'simple-steps-1000', 150)
setupSimple(100, 'optimize-memory-100', 'optimize-memory-equation-100', 'optimize-memory-steps-100', 500, true)
setupSimple(100, 'optimize-numbers-100', 'optimize-numbers-equation-100', 'optimize-numbers-steps-100', 500, false, true)
setupSimple(1000, 'optimize-numbers-1000', 'optimize-numbers-equation-1000', 'optimize-numbers-steps-1000', 150, true, true)
