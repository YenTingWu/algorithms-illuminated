const arr = [6, 1, 3, 8, 7, 2, 4, 5];

let countInversions = (arr) => {
  let totalCount = 0;

  if (arr.length < 2) return totalCount;

  const dismember = (arr) => {
    let result = [];

    for (let i = 0; i < arr.length; i++) {
      const piece = arr[i];
      const half = Math.ceil(piece.length / 2);
      result = [
        ...result,
        piece.slice(0, half),
        piece.slice(half, piece.length),
      ];
    }

    if (result[0].length === 1) return result;
    return dismember(result);
  };

  const merge = (left, right) => {
    let count = 0;
    let result = [];
    let l = 0;
    let r = 0;
    const length = left.length + right.length;

    for (let k = 0; k < length; k++) {
      if (left[l] == null) {
        result[k] = right[r];
        r++;
        continue;
      }

      if (right[r] == null) {
        result[k] = left[l];
        l++;
        continue;
      }

      if (left[l] < right[r]) {
        result[k] = left[l];
        l++;
      } else {
        result[k] = right[r];
        r++;
        count += left.length - l;
      }
    }

    return { mergedList: result, count };
  };

  let result = dismember([arr]);

  while (result.length > 1) {
    let temp = [];
    let i = 0;

    while (result[i]) {
      if (result[i + 1]) {
        const mergeResult = merge(result[i], result[i + 1]);
        const { mergedList, count } = mergeResult;

        totalCount += count;
        temp = [...temp, mergedList];
        i += 2;
        continue;
      }
      temp = [...temp, result[i]];
      i++;
    }
    result = temp;
  }

  return totalCount;
};

const bruceForce = (arr) => {
  let count = 0;
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i; j < arr.length; j++) {
      if (arr[i] > arr[j]) count++;
    }
  }
  return count;
};

console.log(bruceForce(arr));
console.log(countInversions(arr));
