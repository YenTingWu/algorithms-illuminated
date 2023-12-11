const mergeSort = (arr) => {
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
      }
    }

    return result;
  };

  let result = dismember([arr]);

  while (result.length > 1) {
    let temp = [];
    let i = 0;

    while (result[i]) {
      if (result[i + 1]) {
        temp = [...temp, merge(result[i], result[i + 1])];
        i += 2;
        continue;
      }
      temp = [...temp, result[i]];
      i++;
    }
    result = temp;
  }

  return result[0];
};

console.log(
  mergeSort([
    5, 4, 1, 8, 7, 2, 6, 10, 100, 28, 37, 473, 53, 1234, 5435, 67505, 33, 2123,
    443, 23556,
  ])
);
