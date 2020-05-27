$(document).ready(function() {
    let output = []
    let g = []
    let p = []
    let d = []
    let N = 0;
    let npow = 0;

    function getPath(start, set) {
        if (p[start][set] == -1) {
            return;
        }
        var x = p[start][set];
        var mask = npow - 1 - Math.pow(2, x);
        var masked = set & mask;
        output.push(x);
        getPath(x, masked);
    }

    function tsp(start, set) {
        var masked, mask, result = -1
        var temp
        if (g[start][set] != -1) {
            return g[start][set];
        } else {
            for (var x = 0; x < N; x++) {
                mask = npow - 1 - Math.pow(2, x);
                masked = set & mask;
                if (masked != set) {
                    temp = d[start][x] + tsp(x, masked);
                    if (result == -1 || result > temp) {
                        result = temp;
                        p[start][set] = x;
                    }
                }
            }
            g[start][set] = result;
            return result;
        }
    }

    function computeTSP(input, n) {
        N = n
        npow = Math.pow(2, n);
        g = new Array(n);
        p = new Array(n);
        d = input
        for (var i = 0; i < n; i++) {
            g[i] = new Array(npow);
            g[i].fill(-1, 0, npow);
            p[i] = new Array(npow);
            p[i].fill(-1, 0, npow);
            g[i][0] = input[i][0];
        }
        var result = tsp(0, npow - 2);
        output.push(0)
        getPath(0, npow - 2)
        output.push(result)
    }

    // let adjM = [
    //     [0, 2451, 713, 1018, 1631, 1374, 2408, 213, 2571, 875, 1420, 2145, 1972],
    //     [2451, 0, 1745, 1524, 831, 1240, 959, 2596, 403, 1589, 1374, 357, 579],
    //     [713, 1745, 0, 355, 920, 803, 1737, 851, 1858, 262, 940, 1453, 1260],
    //     [1018, 1524, 355, 0, 700, 862, 1395, 1123, 1584, 466, 1056, 1280, 987],
    //     [1631, 831, 920, 700, 0, 663, 1021, 1769, 949, 796, 879, 586, 371],
    //     [1374, 1240, 803, 862, 663, 0, 1681, 1551, 1765, 547, 225, 887, 999],
    //     [2408, 959, 1737, 1395, 1021, 1681, 0, 2493, 678, 1724, 1891, 1114, 701],
    //     [213, 2596, 851, 1123, 1769, 1551, 2493, 0, 2699, 1038, 1605, 2300, 2099],
    //     [2571, 403, 1858, 1584, 949, 1765, 678, 2699, 0, 1744, 1645, 653, 600],
    //     [875, 1589, 262, 466, 796, 547, 1724, 1038, 1744, 0, 679, 1272, 1162],
    //     [1420, 1374, 940, 1056, 879, 225, 1891, 1605, 1645, 679, 0, 1017, 1200],
    //     [2145, 357, 1453, 1280, 586, 887, 1114, 2300, 653, 1272, 1017, 0, 504],
    //     [1972, 579, 1260, 987, 371, 999, 701, 2099, 600, 1162, 1200, 504, 0],
    // ]
    let wrapper = '<div class="wrapper flow"></div>'
    let container = '<div class="svg-container flow1"></div>'
    let svg1 = '<svg version="1.1" viewBox="0 0 500 500" preserveAspectRatio="xMinYMin meet" class="svg-content svg1"></svg>'
    let defs = '<defs><marker id="arrow" markerWidth="4" markerHeight="10" viewBox="-2 -4 4 4" refX="0" refY="0"    markerUnits="strokeWidth" orient="auto">    <polyline points="2,-2 0,0 2,2" stroke="#443c3d" stroke-width="0.75px" fill="none" /></marker></defs>'
    let box_group = '<g class="box-group ?" transform="translate(0,?)"></g>'
        //let circle = '<g transform="translate(-5)"><circle fill="#000" cx="55" cy="50" r="45" opacity="1" /><text x="28" y="58" font-family="Open Sans Condensed" font-size="26" stroke="none" fill="#f5f3e7"font-weight="100" style="text-transform:uppercase; letter-spacing: 1px">Start</text><line x1="102" x2="135" y1="50" y2="50" stroke-width="2" stroke="#443c3d" stroke-dasharray="2,1" /></g>'
    let circle = '<g transform="translate(?)"><circle fill="#000" cx="55" cy="50" r="45" opacity="1" /><text x="28" y="58" font-family="Open Sans Condensed" font-size="26" stroke="none" fill="#f5f3e7"font-weight="100" style="text-transform:uppercase; letter-spacing: 1px">?</text></g>'
        //let rect = '<g transform="translate(136)"><rect fill="#66cc00" x="2" y="25" rx="3" ry="3" width="90" height="50" /><text x="16" y="47" font-family="Open Sans Condensed" font-size="14" stroke="none" fill="#f5f3e7"font-weight="900" style="text-transform:uppercase; letter-spacing: 1px">Workflow<tspan x="26" dy="17">Step #1</tspan></text></g>'
    let rect = '<g transform="translate(?)"><rect fill="#66cc00" x="2" y="25" rx="3" ry="3" width="90" height="50" /><text x="16" y="47" font-family="Open Sans Condensed" font-size="14" stroke="none" fill="#f5f3e7"font-weight="900" style="text-transform:uppercase; letter-spacing: 1px">Workflow<tspan x="26" dy="17">?</tspan></text></g>'

    function stringreplace(x, y) {
        var replaced = x;
        for (var i = 0; i < y.length; i++) {
            replaced = replaced.replace("?", y[i]);
        }
        return replaced;
    }

    // function flowchart() {
    //     $(".flow").remove();
    //     $(".divc1").append(wrapper)
    //     $(".flow").append(container)
    //     $(".flow1").append(svg1)
    //     $(".svg1").append(defs)
    //     var transform = [5, 136, 268, 400]
    //     for (var i = 0; i < Math.ceil(output.length / 4); i++) {
    //         var box = stringreplace(box_group, ["box" + i, "" + (100 * i)])
    //         var shapes = []
    //         var count = 0;
    //         if (i % 2 == 0) count = i * 4;
    //         else count = i * 4 + 3
    //         for (var j = 0; j < 4; j++) {
    //             if (i == 0 && j == 0) {
    //                 shapes.push(stringreplace(circle, ["-5", "" + output[0]]))
    //             } else if (count == output.length) {
    //                 shapes.push(stringreplace(circle, ["" + transform[j], output[count]]))
    //             } else if (count < output.length) {
    //                 shapes.push(stringreplace(rect, ["" + transform[j], output[count]]))
    //             }
    //             if (i % 2 == 0) count++;
    //             else count--;
    //         }
    //         $(".svg1").append(box);
    //         for (var j = 0; j < shapes.length; j++) {
    //             $(".box" + i).append(shapes[j])
    //         }
    //     }
    // }

    $(".compute").click(function() {
        output = []
        var x = $(".adjmatrix").val();
        if (x.length == 0) {
            $(".output").remove();
            $(".output1").remove();
            $(".divc1").append('<p class="output">You have not specified any coordinates</p>');
        } else {
            input = JSON.parse(x);
            N = input.length
            computeTSP(input, N)
            console.log(output);
            var outstr = ""
            for (var i = 0; i < output.length - 1; i++) {
                outstr += "City " + (output[i] + 1) + " ------> "
            }
            outstr += "City " + (output[0] + 1)
            $(".output").remove();
            $(".output1").remove();
            $(".divc1").append('<p class="output">' + outstr + '</p>');
            $(".divc1").append('<p class="output1">The total distance to travel is ' + output[output.length - 1] + '</p>');
        }
    })

    // computeTSP(adjM, 13)
    // console.log(output)
})