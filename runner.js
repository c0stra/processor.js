
function assert(value, result, description) {
    if(result) {
        return "Expected: " + description + ", and actual: " + value;
    } else {
        throw new Error("Expected: " + description + ", but actual: " + value);
    }
}

function run() {
    var tests = arguments;

    return function() {
        var results = document.getElementById("results");

        function row(test, result, message) {
            var row = results.appendChild(document.createElement("tr"));
            row.setAttribute("class", result);
            row.appendChild(document.createElement("td")).appendChild(document.createTextNode(tests[i].name));
            row.appendChild(document.createElement("th")).appendChild(document.createTextNode(result));
       }

        for(var i = 0; i < tests.length; i++) {
            try {
                row(tests[i], "PASSED", tests[i]());
            } catch(exception) {
                row(tests[i], "FAILED", exception);
                var stack = results.appendChild(document.createElement("tr")).appendChild(document.createElement("td"));
                stack.appendChild(document.createTextNode(exception.stack));
                stack.setAttribute("colspan", "2");
                stack.setAttribute("class", "stack");
            }
        }
    }
}
