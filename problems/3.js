var primeNumbers = [2, 3, 5, 7]

function setupSimple(newNumber, buttonSelector, intervalLength) {
    var interval;
    var button = document.getElementById(buttonSelector)
    var equation = document.getElementById(buttonSelector + '-equation')
    var stepsElement = document.getElementById(buttonSelector + "-steps")
    function clearCurrentInterval() {
        clearInterval(interval)
        interval = null
    }
    button.addEventListener('click', () => {
        var currentPrime = 0
        var factors = []
        var number = newNumber
        if (interval) {
            clearCurrentInterval()
        } else {
            function findNextPrime(number) {
                var nextCheck = number
                var isPrime
                while (!isPrime) {
                    isPrime = true
                    nextCheck ++
                    for (var i = 0; i < primeNumbers.length; i++) {
                        var check = primeNumbers[i]
                        if (nextCheck % check === 0) {
                            isPrime = false
                            break
                        }
                    }
                }
                return nextCheck
            }

            function nextPrimeNumber() {
                var index = primeNumbers.indexOf(currentPrime)
                if (!currentPrime || currentPrime < 2) {
                    currentPrime = 2;
                } else if (index !== -1 && index + 1 < primeNumbers.length) {
                    currentPrime = primeNumbers[index + 1]
                } else {
                    var newPrime = findNextPrime(currentPrime)
                    primeNumbers.push(newPrime)
                    currentPrime = newPrime
                }
            }

            function nextCurrent() {
                nextPrimeNumber()
            }
            function nextSimple() {
                var html = ''
                if (number === 1) {
                    clearCurrentInterval()
                } else if (number % currentPrime === 0) {
                    html += '<p>' + number + ' is divisible by ' + currentPrime + ', left ' + number / currentPrime + '.</p>'
                    number /= currentPrime
                    factors.push(currentPrime)
                } else {
                    html  += '<p>' + number + ' is not divisible by ' + currentPrime + ', finding the next prime.</p>'
                    nextCurrent()
                }

                html += '<p>Prime factors ' + factors.join(', ') + '.</p>'
                stepsElement.innerHTML = html
            }
            nextCurrent()
            nextSimple()
            interval = setInterval(nextSimple, intervalLength)
        }
    })
}

// setup super simple
setupSimple(30, 'simple-30', 1000)
setupSimple(100, 'simple-100', 1000)
setupSimple(173, 'simple-173', 1000)
setupSimple(245, 'simple-245', 1000)
setupSimple(13195, 'simple-13195', 500)
setupSimple(600851475143, 'simple-600851475143', 200)
