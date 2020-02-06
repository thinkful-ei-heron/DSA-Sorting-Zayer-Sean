const LinkedList = require('./linkedList')
/*
1

    - After 3 recursive calls, [21 , 1] are returned

    - [21] [1] [26] [45] [29] [28] [2] [9] [16] [49] [39] [27] [43] [34] [46] [40]

    - [21] [40]

      [1, 21] [40, 46]

    - [1, 2, 21, 26, 28, 29, 45]     [27, 34, 39, 40, 43, 46, 49]


*/

/*
2

    - The pivot could have been either 14 or 17. Values on either side of both are greater than and less than
      respectively

    - 14 17 13 15 19 10 3 16 9 12
       Resulting list when using the last item as pivot after the 2nd partitioning:
       10 3 9 12        14 13 17 16 19 15
       12 3 9 10        14 13 15 16 19 17    after new pivot positions have been determined

       Resulting list when using the first item as pivot after the 2nd partitioning:

       13 3 9 12 10       15 16 19 17

*/

function mergeSort(array) {
    if (array.length <= 1) {
        return array;
    }

    const middle = Math.floor(array.length / 2);
    let left = array.slice(0, middle);
    let right = array.slice(middle, array.length);

    left = mergeSort(left);
    right = mergeSort(right);
    return merge(left, right, array);
};

function merge(left, right, array) {
    let leftIndex = 0;
    let rightIndex = 0;
    let outputIndex = 0;
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            array[outputIndex++] = left[leftIndex++];
        }
        else {
            array[outputIndex++] = right[rightIndex++];
        }
    }

    for (let i = leftIndex; i < left.length; i++) {
        array[outputIndex++] = left[i];
    }

    for (let i = rightIndex; i < right.length; i++) {
        array[outputIndex++] = right[i];
    }
    return array;
};

function quickSort(array, start = 0, end = array.length) {
    if (start >= end) {
        return array;
    }
    const middle = partition(array, start, end);
    array = quickSort(array, start, middle);
    array = quickSort(array, middle + 1, end);
    return array;
};

function partition(array, start, end) {
    const pivot = array[end - 1];
    let j = start;
    for (let i = start; i < end - 1; i++) {
        if (array[i] <= pivot) {
            swap(array, i, j);
            j++;
        }
    }
    swap(array, end-1, j);
    return j;
};

function swap(array, i, j){
    let temp = ''
    temp = array[i]
    array[i] = array[j]
    array[j] = temp
    return array
}
function mergeSortLinked(ll) {
    if (ll.size() <= 1) {
        return ll;
    }

    let left = new LinkedList()
    let right = new LinkedList()

    right.head = ll.middleList()
    left.head = ll.splitListMiddle()

    left = mergeSortLinked(left);
    right = mergeSortLinked(right);
    return mergeLinked(left, right, ll);
};
function mergeLinked(left, right, ll) {

    while (left.head !== null && right.head !== null) {
        if (left.head.value < right.head.value) {
            ll.head = left.head.next;
        }
        else {
            ll.head = right.head.next;
        }
    }
        ll.head.next = left.head;
        ll.head.next = right.head;
    return ll;
};

function main(){

    let array = [89, 30, 25, 32, 72, 70, 51, 42, 25, 24, 53, 55, 78, 50, 13, 40, 48, 32, 26, 2, 14, 33, 45, 72, 56, 44, 21, 88, 27, 68, 15, 62, 93, 98, 73, 28, 16, 46, 87, 28, 65, 38, 67, 16, 85, 63, 23, 69, 64, 91, 9, 70, 81, 27, 97, 82, 6, 88, 3, 7, 46, 13, 11, 64, 76, 31, 26, 38, 28, 13, 17, 69, 90, 1, 6 , 7, 64, 43, 9, 73, 80, 98, 46, 27, 22, 87, 49, 83, 6, 39, 42, 51, 54, 84, 34, 53, 78, 40, 14, 5]

    //console.log(quickSort(array))

    // console.log(mergeSort(array))

    let ll = new LinkedList();
    ll.insertFirst('Apollo');
    ll.insertLast('Boomer');
    ll.insertLast('Helo');
    ll.insertLast('Husker');
    ll.insertLast('Starbuck');
    ll.insertLast('Tauhida');
    ll.display()
    mergeSortLinked(ll)
}

main()
