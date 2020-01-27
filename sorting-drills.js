//const { LinkedList } = require('./linkedlist')
class _Node {
    constructor(value, next) {
      this.value = value;
      this.next = next;
    }
  }
  
  class LinkedList {
    constructor() {
      this.head = null;
    }
  
    insertFirst(item) {
      this.head = new _Node(item, this.head);
    }
  
    insertLast(item) {
      if (this.head === null) {
        this.insertFirst(item);
      }
      else {
        let tempNode = this.head;
        while (tempNode.next !== null) {
            tempNode = tempNode.next;
        }
        tempNode.next = new _Node(item, null);
      }
    }
  
    insertBefore(item, key) {
      let currNode = this.head;
      let prevNode = this.head;
  
      if (this.head.value === key) {
        this.insertFirst(item);
      } else {
        while((currNode !== null) && (currNode.value !== key)) {
          prevNode = currNode
          currNode = currNode.next
        }
      }
      prevNode.next = new _Node(item, currNode);
    }
  
    insertAfter(item, key) {
      let currNode = this.head;
      let prevNode = this.head;
  
      if (this.head.value === key) {
        this.insertFirst(item);
      } else {
        while((currNode !== null) && (currNode.value !== key)) {
          prevNode = currNode
          currNode = currNode.next
        }
      }
      currNode.next = new _Node(item, prevNode.next.next);
    }
  
    insertAt(item, position){
      
      let currNode = this.head
      let prevNode = this.head
      let counter = 0
  
      while((currNode !== null)&&(counter !== (position))) {
          prevNode = currNode
          currNode = currNode.next
          counter++
      }
      prevNode.next = new _Node(item, currNode.next)
      return currNode
    }
  
    find(item) { 
      // Start at the head
      let currNode = this.head;
      // If the list is empty
      if (!this.head) {
        return null;
      }
      // Check for the item 
      while (currNode.value !== item) {
          /* Return null if it's the end of the list 
          and the item is not on the list */
          if (currNode.next === null) {
            return null;
          }
          else {
            // Otherwise, keep looking 
            currNode = currNode.next;
          }
      }
      // Found it
      return currNode;
    }
  
    remove(item){ 
      // If the list is empty
      if (!this.head) {
        return null;
      }
      // If the node to be removed is head, make the next node head
      if (this.head.value === item) {
        this.head = this.head.next;
        return;
      }
      // Start at the head
      let currNode = this.head;
      // Keep track of previous
      let previousNode = this.head;
  
      while ((currNode !== null) && (currNode.value !== item)) {
        // Save the previous node 
        previousNode = currNode;
        currNode = currNode.next;
      }
      if (currNode === null) {
        //console.log('Item not found');
        return;
      }
      previousNode.next = currNode.next;
    }
  }
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


/*
    3   Implementing quicksort
*/
function quickSort(array, start = 0, end = array.length) {
    if (start >= end) {
        return array;
    }
    const middle = partition(array, start, end);
    array = quickSort(array, start, middle);
    array = quickSort(array, middle + 1, end);
    return array;
};

function swap(array, i, j){
    let temp = ''
    temp = array[i]
    array[i] = array[j]
    array[j] = temp
    return array
}

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


/*
    4   Implementing merge sort
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



/*
    5   Sorting a Linked List Using Merge Sort
*/
function mSort(linkedListArray){
    let temp = []
    let curr = linkedListArray.head
    while (curr.next !==null){
        temp.push(curr)
        curr=curr.next
    }
    //mergeSortLL(temp)
    function mergeSortLL(array) {
        if (array.length <= 1) {
            return array;
        }
    
        const middle = Math.floor(array.length / 2);
        let left = array.slice(0, middle);
        let right = array.slice(middle, array.length);
    
        left = mergeSortLL(left);
        right = mergeSortLL(right);
        return mergeLL(left, right, array);
    };

    function mergeLL(left, right, array) {
        let leftIndex = 0;
        let rightIndex = 0;
        let outputIndex = 0;
        while (leftIndex < left.length && rightIndex < right.length) {
            if (left[leftIndex].value < right[rightIndex].value) {
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
    return mergeSortLL(temp)
}


/*
    6   Bucket Sort
*/
function bucketSort(array){

    let highest=(Math.max(...array))
    let lowest=(Math.min(...array))
    let bucket1 = []
    let bucket2 = []
    let bucket3 = []
    let bucket4 = []
    let bucket5 = []
    let bucket6 = []
    let bucket7 = []
    let bucket8 = []
    let midpoint = Math.floor((lowest+highest)/2)
    let quarterPoint = Math.floor(midpoint/2)
    let threeQuarterPoint = Math.floor((midpoint+highest)/2)
    let i = 0
    let j = array.length-1

    console.log(quarterPoint)
    console.log(midpoint)
    console.log(threeQuarterPoint)

    while(i < j){
        if(array[i] < quarterPoint){
            array[i] < Math.floor(quarterPoint/2) ? bucket1.push(array[i]) : bucket2.push(array[i])
        }
        else if(array[i] < midpoint){
            array[i] < Math.floor((midpoint-(quarterPoint/2))) ? bucket3.push(array[i]) : bucket4.push(array[i])
        }
        else if(array[i] < threeQuarterPoint){
            array[i] < Math.floor((midpoint+(quarterPoint/2))) ? bucket5.push(array[i]) : bucket6.push(array[i])
        } else {
            array[i] < Math.floor(((threeQuarterPoint+highest)/2)) ? bucket7.push(array[i]) : bucket8.push(array[i])
        }
        i++
    }

    mergeSort(bucket1)
    mergeSort(bucket2)
    mergeSort(bucket3)
    mergeSort(bucket4)
    mergeSort(bucket5)
    mergeSort(bucket6)
    mergeSort(bucket7)
    mergeSort(bucket8)
    let sorted = bucket1.concat(bucket2).concat(bucket3).concat(bucket4).concat(bucket5).concat(bucket6).concat(bucket7).concat(bucket8)
    //console.log(mergeSort(bucket1.concat(bucket2).concat(bucket3).concat(bucket4).concat(bucket5).concat(bucket6).concat(bucket7).concat(bucket8)))

    console.log(sorted)

    return null

}


/*
    7 Sort In Place
*/
function randomSortInPlace(array){
    
    console.log(array)
    let length = array.length
    let i = 0
    let j = 0
    let counter = 0
    //let q = 0
    let end = array.length-1
    let tempArray = []
    
    recursiveFiller(array, counter, tempArray)

    function recursiveFiller(array, counter, tempArray){
        let temp = ''
        if(counter >= array.length){
           return 0
       }
       randomNumber = Math.floor(Math.random()*length+1)
       if(tempArray[0]){
           let tempNum = tempArray.indexOf(randomNumber)
       if(tempNum !== -1){
           return recursiveFiller(array, counter, tempArray)
       } 
       }
       temp = array[counter]
       array[counter] = array[randomNumber]
       array[randomNumber] = temp
       tempArray.push(randomNumber)
       ++counter
       //console.log(counter)
       //console.log(tempArray)
       return recursiveFiller(array, counter, tempArray)
    }
    
    console.log(array)
    //console.log(tempArray.sort(function(a,b){ return a-b }))
}


/*
    8   Sorting Books (Based on Title)
*/
function bookSort(arrayOfBooks){
    let length = arrayOfBooks.length
    for(let i=0; i < length; i++){
        for(let j=0; j < length-1; j++){
            if(arrayOfBooks[j] > arrayOfBooks[j+1]){
                let temp = arrayOfBooks[j]
                arrayOfBooks[j] = arrayOfBooks[j+1]
                arrayOfBooks[j+1] = temp
            }
        }
    }
    return arrayOfBooks
}

/*
    8   Sorting Books (Based on Title AND Author)
*/
function bookSortComplete(arrayOfBooksComplete){
    let temp = []
    let length = arrayOfBooksComplete.length
    for(let i=0; i < length; i++){
        for(let j=0; j < length-1; j++){
            if(Object.keys(arrayOfBooksComplete[j]) > Object.keys(arrayOfBooksComplete[j+1])){
                let temp = arrayOfBooksComplete[j]
                arrayOfBooksComplete[j] = arrayOfBooksComplete[j+1]
                arrayOfBooksComplete[j+1] = temp
            } 
            let key1 = Object.keys(arrayOfBooksComplete[j])
            let key2 = Object.keys(arrayOfBooksComplete[j+1])
            if( key1[0] === key2[0]){
                let a = Object.values(arrayOfBooksComplete[j])
                let b = Object.values(arrayOfBooksComplete[j+1])
                if(a[0] > b[0]){
                        console.log('same!!!')
                        let temp2 = arrayOfBooksComplete[j]
                        arrayOfBooksComplete[j] = arrayOfBooksComplete[j+1]
                        arrayOfBooksComplete[j+1] = temp2
                    }
                }      
        }
    }
    return arrayOfBooksComplete
}

function main(){
    let SLL = new LinkedList;
    SLL.insertFirst('Apllo')
    SLL.insertFirst('Boomer')
    SLL.insertFirst('Helo')
    SLL.insertFirst('Husker')
    SLL.insertFirst('Starbuck')
    SLL.insertFirst('Tauhida')
    console.log(SLL)
    console.log(mSort(SLL))
    let array = [89, 30, 25, 32, 72, 70, 51, 42, 25, 24, 53, 55, 78, 50, 13, 40, 48, 32, 26, 2, 14, 33, 45, 72, 56, 44, 21, 88, 27, 68, 15, 62, 93, 98, 73, 28, 16, 46, 87, 28, 65, 38, 67, 16, 85, 63, 23, 69, 64, 91, 9, 70, 81, 27, 97, 82, 6, 88, 3, 7, 46, 13, 11, 64, 76, 31, 26, 38, 28, 13, 17, 69, 90, 1, 6 , 7, 64, 43, 9, 73, 80, 98, 46, 27, 22, 87, 49, 83, 6, 39, 42, 51, 54, 84, 34, 53, 78, 40, 14, 5]
    let arrayOfBooks = [`Goode's World Atlas`, `My Sherlock Holmes`, `Trick of the Eye`, `The Prince of Providence`, `Catching Fire`,
                        `Crime and Politics`, `Voices of Freedom`, `Before The Beginning`, `Contact`, `Give Me Liberty`]

    let arrayOfBooksComplete = [{ 'Sutton, Christopher J':`Goode's World Atlas`}, {'Michael Kurland':`My Sherlock Holmes`}, {'Hitchcock, Jane Stanton':`Trick of the Eye`}, 
            {'Stanton, Mike':`The Prince of Providence`}, {'Collins, Suzanne':`Catching Fire`}, {'Gest, Ted':`Crime and Politics`}, 
            {'Foner, Eric':`Voices of Freedom`}, {'Rees, Martin':`Before The Beginning`}, {'Sagan, Carl':`Contact`}, {'Foner, Eric':`Give Me Liberty`}]
    //console.log(quickSort(array))

    //console.log(mergeSort(array))

    //console.log(bucketSort(array))

    //randomSortInPlace(array)

    //console.log(bookSort(arrayOfBooks))

   // console.log(bookSortComplete(arrayOfBooksComplete))
}

/*
    The Following is the console.log from bookSortComplete : 
            [
                { 'Collins, Suzanne': 'Catching Fire' },
                { 'Foner, Eric': 'Give Me Liberty' },
                { 'Foner, Eric': 'Voices of Freedom' },
                { 'Gest, Ted': 'Crime and Politics' },
                { 'Hitchcock, Jane Stanton': 'Trick of the Eye' },
                { 'Michael Kurland': 'My Sherlock Holmes' },
                { 'Rees, Martin': 'Before The Beginning' },
                { 'Sagan, Carl': 'Contact' },
                { 'Stanton, Mike': 'The Prince of Providence' },
                { 'Sutton, Christopher J': "Goode's World Atlas" }
            ]
*/




main()



