import autoGroupStrings from "../index";

describe("auto-group-strings", () => {
  test("returns an empty array for empty array in first argument", () => {
    const result = autoGroupStrings([]);

    expect(result instanceof Array).toBe(true);
  });

  test("groups strings and applies default space delimiter & rtl direction", () => {
    const result = autoGroupStrings([
      "hello code", // 0
      "apple and orange", // 1
      "for the happy code", // 2
      "i don't know", // 3
      "is it?", // 4
      "it's a happy code", // 5
      "ok", // 6
      "you mean the happy code", // 7
    ]);

    expect(result[0].common).toBe("code");
    expect(result[0].members).toStrictEqual([0, 2, 5, 7]);
    expect(result[1].common).toBe("happy code");
    expect(result[1].members).toStrictEqual([2, 5, 7]);
    expect(result[2].common).toBe("the happy code");
    expect(result[2].members).toStrictEqual([2, 7]);
  });

  test("applies given delimiter, direction and caseSensitive check", () => {
    const result1 = autoGroupStrings(
      [
        "hello, hi, hey, world", // 0
        "hello, world", // 1
        "apple and orange", // 2
        "hello, hi, hey, developer", // 3
      ],
      {
        delimiter: ",",
        direction: "ltr",
        caseSensitive: true,
      },
    );

    expect(result1[0].common).toBe("hello");
    expect(result1[0].members).toStrictEqual([0, 1, 3]);
    expect(result1[1].common).toBe("hello, hi");
    expect(result1[1].members).toStrictEqual([0, 3]);
    expect(result1[2].common).toBe("hello, hi, hey");
    expect(result1[2].members).toStrictEqual([0, 3]);

    const result2 = autoGroupStrings(
      [
        "hello, hi, hey, world", // 0
        "hello, world", // 1
        "apple and orange", // 2
        "hello, hi, hey, developer", // 3
      ],
      {
        delimiter: ",",
        direction: "rtl",
        caseSensitive: false,
      },
    );

    expect(result2[0].common).toBe(" world");
    expect(result2[0].members).toStrictEqual([0, 1]);

    const result3 = autoGroupStrings(
      [
        "hello, hi, hey, world", // 0
        "hello, world", // 1
        "apple and orange", // 2
        "hello, hi, hey, developer", // 3
      ],
      {
        delimiter: ",",
        direction: "rtl",
        caseSensitive: true,
      },
    );

    expect(result3[0].common).toBe(" world");
    expect(result3[0].members).toStrictEqual([0, 1]);

    const result4 = autoGroupStrings(
      [
        "hello, hi, hey, world", // 0
        "hello, world", // 1
        "apple and orange", // 2
        "hello, hi, hey, developer", // 3
      ],
      {
        delimiter: ",",
        direction: "ltr",
        caseSensitive: false,
      },
    );

    expect(result4[0].common).toBe("hello");
    expect(result4[0].members).toStrictEqual([0, 1, 3]);
  });

  test("includes different common properties", () => {
    const result1 = autoGroupStrings(
      [
        "Cat, Animal", // 0
        "Cat, Animal", // 1
        "Dog, Animal", // 2
        "Monkey, Animal", // 3
        "Monkey, Animal", // 4
        "Tiger, Animal", // 5
        "Monkey, Animal", // 6
        "Monkey, Animal", // 7
        "Lion, Animal", // 8
        "Wolf, Animal", // 9
        "Spider, Insect", // 10
        "Butterfly, Insect", // 11
        "Shark, Fish", // 12
        "Fly, Insect", // 13
        "Wolf, Animal", // 14
        "Ant, Insect", // 15
      ],
      {
        delimiter: ", ",
      },
    );

    expect(result1).toStrictEqual([
      { common: "Animal", members: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 14] },
      { common: "Cat, Animal", members: [0, 1] },
      { common: "Monkey, Animal", members: [3, 4, 6, 7] },
      { common: "Insect", members: [10, 11, 13, 15] },
      { common: "Wolf, Animal", members: [9, 14] },
    ]);

    const result2 = autoGroupStrings(
      [
        "Animal, Cat", // 0
        "Animal, Cat", // 1
        "Animal, Dog", // 2
        "Animal, Monkey", // 3
        "Animal, Monkey", // 4
        "Animal, Tiger", // 5
        "Animal, Monkey", // 6
        "Animal, Monkey", // 7
        "Animal, Lion", // 8
        "Animal, Wolf", // 9
        "Insect, Spider", // 10
        "Insect, Butterfly", // 11
        "Fish, Shark", // 12
        "Insect, Fly", // 13
        "Animal, Wolf", // 14
        "Insect, Ant", // 15
      ],
      {
        delimiter: ", ",
        direction: "ltr",
      },
    );

    expect(result2).toStrictEqual([
      { common: "Animal", members: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 14] },
      { common: "Animal, Cat", members: [0, 1] },
      { common: "Animal, Monkey", members: [3, 4, 6, 7] },
      { common: "Insect", members: [10, 11, 13, 15] },
      { common: "Animal, Wolf", members: [9, 14] },
    ]);
  });

  test("allows other options while delimiter is not provided", () => {
    const result = autoGroupStrings(
      [
        "hello code", // 0
        "apple and orange", // 1
        "for the happy code", // 2
        "i don't know", // 3
        "is it?", // 4
        "it's a happy code", // 5
        "ok", // 6
        "you mean the happy code", // 7
      ],
      {
        caseSensitive: true,
      },
    );

    expect(result instanceof Array).toBe(true);
  });

  test("matches sequentially", () => {
    const addresses = [
      "Block, 5th, Aviation Road", // 0
      "Block, 5th, Aviation Road", // 1
      "Block, 4th, Aviation Road", // 2
      "Block, 10th, Aviation Road", // 3
      "Block, 10th, Aviation Road", // 4
      "Block, 3rd, Aviation Road", // 5
      "Block, 10th, Aviation Road", // 6
      "Block, 10th, Aviation Road", // 7
      "Block, 6th, Aviation Road", // 8
      "Block, 2nd, Aviation Road", // 9
    ];

    const result1 = autoGroupStrings(addresses, { delimiter: ", " });

    expect(result1).toStrictEqual([
      {
        common: "Aviation Road",
        members: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      },
      { common: "5th, Aviation Road", members: [0, 1] },
      { common: "Block, 5th, Aviation Road", members: [0, 1] },
      { common: "10th, Aviation Road", members: [3, 4, 6, 7] },
      { common: "Block, 10th, Aviation Road", members: [3, 4, 6, 7] },
    ]);

    const result2 = autoGroupStrings(addresses, {
      delimiter: ", ",
      direction: "ltr",
    });

    expect(result2).toStrictEqual([
      {
        common: "Block",
        members: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      },
      { common: "Block, 5th", members: [0, 1] },
      { common: "Block, 5th, Aviation Road", members: [0, 1] },
      { common: "Block, 10th", members: [3, 4, 6, 7] },
      { common: "Block, 10th, Aviation Road", members: [3, 4, 6, 7] },
    ]);
  });

  test("include groups containing single element in members array", () => {
    const addresses = [
      "Block, 5th, Aviation Road", // 0
      "Block, 5th, Aviation Road", // 1
      "Block, 4th, Aviation Road", // 2
      "Block, 10th, Aviation Road", // 3
      "Block, 10th, Aviation Road", // 4
      "Block, 3rd, Aviation Road", // 5
      "Block, 10th, Aviation Road", // 6
      "Block, 10th, Aviation Road", // 7
      "Block, 6th, Aviation Road", // 8
      "Block, 2nd, Aviation Road", // 9
    ];

    const result1 = autoGroupStrings(addresses, {
      delimiter: ", ",
      includeSingleElementMembers: true,
    });

    expect(result1).toStrictEqual([
      {
        common: "Aviation Road",
        members: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      },
      { common: "5th, Aviation Road", members: [0, 1] },
      { common: "Block, 5th, Aviation Road", members: [0, 1] },
      { common: "10th, Aviation Road", members: [3, 4, 6, 7] },
      { common: "Block, 10th, Aviation Road", members: [3, 4, 6, 7] },
      { common: "Block, 4th, Aviation Road", members: [2] },
      { common: "Block, 3rd, Aviation Road", members: [5] },
      { common: "Block, 6th, Aviation Road", members: [8] },
      { common: "Block, 2nd, Aviation Road", members: [9] },
    ]);

    const result2 = autoGroupStrings(addresses, {
      delimiter: ", ",
      direction: "ltr",
      includeSingleElementMembers: true,
    });

    expect(result2).toStrictEqual([
      {
        common: "Block",
        members: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      },
      { common: "Block, 5th", members: [0, 1] },
      { common: "Block, 5th, Aviation Road", members: [0, 1] },
      { common: "Block, 10th", members: [3, 4, 6, 7] },
      { common: "Block, 10th, Aviation Road", members: [3, 4, 6, 7] },
      { common: "Block, 4th, Aviation Road", members: [2] },
      { common: "Block, 3rd, Aviation Road", members: [5] },
      { common: "Block, 6th, Aviation Road", members: [8] },
      { common: "Block, 2nd, Aviation Road", members: [9] },
    ]);
  });

  test("accept and apply optional delimiterRegExp of RegExp type", () => {
    const animals = [
      "Cat, Animal", // 0
      "Cat, Animal", // 1
      "Dog, Animal", // 2
      "Monkey, Animal", // 3
      "Monkey, Animal", // 4
      "Tiger, Animal", // 5
      "Monkey, Animal", // 6
      "Monkey, Animal", // 7
      "Lion, Animal", // 8
      "Wolf, Animal", // 9
      "Spider, Insect", // 10
      "Butterfly, Insect", // 11
      "Shark, Fish", // 12
      "Fly, Insect", // 13
      "Wolf, Animal", // 14
      "Ant, Insect", // 15
    ];

    const result1 = autoGroupStrings(animals, {
      delimiterRegExp: /, ?/, // using RegExp
    });

    expect(result1).toStrictEqual([
      { common: "Animal", members: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 14] },
      { common: "Cat, Animal", members: [0, 1] },
      { common: "Monkey, Animal", members: [3, 4, 6, 7] },
      { common: "Insect", members: [10, 11, 13, 15] },
      { common: "Wolf, Animal", members: [9, 14] },
    ]);

    const result2 = autoGroupStrings(animals, {
      delimiterRegExp: /<no matching regexp>/,
      delimiter: ", ", // use provided string as fallback
    });

    expect(result2).toStrictEqual([
      { common: "Animal", members: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 14] },
      { common: "Cat, Animal", members: [0, 1] },
      { common: "Monkey, Animal", members: [3, 4, 6, 7] },
      { common: "Insect", members: [10, 11, 13, 15] },
      { common: "Wolf, Animal", members: [9, 14] },
    ]);

    // direction left to right
    const result3 = autoGroupStrings(
      animals.map((x) => x.split(", ").reverse().join(", ")),
      {
        delimiterRegExp: /<no matching regexp>/,
        delimiter: ", ", // use provided string as fallback
        direction: "ltr",
      },
    );

    expect(result3).toStrictEqual([
      { common: "Animal", members: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 14] },
      { common: "Animal, Cat", members: [0, 1] },
      { common: "Animal, Monkey", members: [3, 4, 6, 7] },
      { common: "Insect", members: [10, 11, 13, 15] },
      { common: "Animal, Wolf", members: [9, 14] },
    ]);
  });
});
