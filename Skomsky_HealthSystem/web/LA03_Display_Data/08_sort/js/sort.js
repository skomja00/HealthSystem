function sort(list, byProperty) {
    var size = list.length;
    console.log("size is " + size);
    
    // selection sort
    for (var i = 0; i < size - 1; i++) {
        var small = i;
        console.log('i is ' + i);
        for (var j = i; j < size; j++) {
            console.log("j is " + j);
            var listJ = list[j];
            var listSmall = list[small];

            // use associative array notation (using property name like array index)
            if (listJ[byProperty] < listSmall[byProperty]) {
                small = j;
                console.log("small is " + small);
            }
        }
        // swap element i with element small
        var temp = list[i];
        list[i] = list[small];
        list[small] = temp;
        console.log("swapped i " + i + " with small " + small);
    }
}