# Counting Inversions in O(nlongn) Time

Q: What is the largest-possible number of inversions a 6-element array can have?

15 = 5 + 4 + 3 + 2 + 1 ([6, 5, 4, 3, 2, 1])

---

### Collaborative Filtering

the idea is to identify other users who have similar preferences, and to recommend to you things that have been popular with them. Thus collaborative filtering algorithms require a formal notion of “similarity“ between users, and the problem of computing inversions captures some of the essence of this problem.

---

### Brute-Force Search for Counting Inversions

```tsx
// Input: Array A of n distinct integers.
// Output: the number of inversions of A

/**
  let numberInv = 0

  for i := 1 to n - 1 do
    for j := i + 1 to n do
      if A[i] > A[j] then
        numberInv := numberInv + 1

   return numberInv
*/
```

The time complexity will be O(n^2)

---

### A Divide-and-Conquer Approach

1. _left inversion:_ an inversion with i, j both in the first haft of the array
2. _right inversion:_ an inversion with i,j both in the second half of the array
3. _split inversion:_ an inversion with i in the left half and j in the right half

---

### D&C High-Level Algorithm

```tsx
// Input: Array A of n distinct integers.
// Output: the number of inversions of A

/**
  if n = 0 or n = 1 then
    return 0
  else
    leftInv := CountInv(first half of A)
    rightInv := CountInv(second half of A)
    splitInv := CountSplitInv(A)
    return leftInv + rightInv + splitInv
*/
```

---

### Piggyback on _MergeSort_

- Sort and Count Inversions

```tsx
// Input: Array A of n distinct integers.
// Output: sorted array B with the same integers, and the number of inversions of A

/**
  if n = 0 or n = 1 then
    return 0
  else
    (C, leftInv) := Sort-and-CountInv(first half of A)
    (D, rightInv) := Sort-and-CountInv(second half of A)
    (B, splitInv) := Merge-and-CountSplitInv(C,D)
    return (B, leftInv + rightInv + splitInv)
*/
```

---

### _Merge_ Revisited

Q: Suppose the input array _A_ has no split inversions. What is the relationship between the sorted subarrays _C_ and _D_?

A: All elements of C are less than all elements D.

---

### Merge-and-CountSplitInv

**Merge**

- While merging the two sorted subarrays, keep running total of number of split inversions
- When element of 2nd array D gets copied to out put B, inversions total by number of elements remaining in 1st array C

Run time of subroutine: O(n) (merge) + O(n) (running total) = O(n)

⇒ Sort-and-count runs in O(nlongn)

```tsx
// Input: sorted arrays C and D(n / 2 each)
// Output: sorted array B(n) and the number of split inversions.
// Simplifying assumption: n is even

/**
  i := 1; j := 1; splitInv := 0
  for k := 1 to n do
    if C[i] < D[j] then
      B[k] := C[i]
      i := i + 1
    else
      B[k] := D[j]
      j := j + 1
      splitInv := splitInv + (n / 2 - i + 1) -----> left in C

    return (B,splitInv)
*/
```

---

### Running Time

Counting Inversions: For every input array A of length n ≥ 1, the **_Sort-and-CountInv_** algorithm computes the number of inversions of A and runs in O(nlogn) time.
