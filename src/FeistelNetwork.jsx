import { useState } from "react";
import { FeistelSvgGenerator } from "./FestelSvgGenerator";
import {
  ChakraProvider,
  Select,
  Box,
  Input,
  Button,
  Heading,
  useToast,
  Stack,
  Text,
} from "@chakra-ui/react";

export const FeistelNetwork = () => {
  const [res, setRes] = useState([]);
  const [binaryString, setBinaryString] = useState("10000101101010000");
  const [inputNumber, setInputNumber] = useState("8");
  const [ownKeys, setOwnKeys] = useState("");
  const [mode, setMode] = useState("1");
  const toast = useToast();
  const [items, setItems] = useState([]);
  const [finalString, setFinalString] = useState("");

  function F(inputString, number) {
    let binaryNumber = number.toString(2);
    if (binaryNumber.length < inputString.length) {
      binaryNumber = binaryNumber.padStart(inputString.length, "0");
    } else if (binaryNumber.length > inputString.length) {
      binaryNumber = binaryNumber.slice(0, inputString.length);
    }
    let xorResult = "";
    for (let i = 0; i < inputString.length; i++) {
      xorResult += (inputString[i] ^ binaryNumber[i]).toString();
    }
    return xorResult;
  }

  function XOR(string1, string2) {
    let xorResult = "";
    for (let i = 0; i < string1.length; i++) {
      xorResult += string1[i] === string2[i] ? "0" : "1";
    }

    return xorResult;
  }
  function splitBits(binaryString, S) {
    const blocks = [];
    for (let i = 0; i < binaryString.length; i += S) {
      let block = binaryString.slice(i, i + S);
      if (block.length < S) {
        block = block.padEnd(S, "0");
      }
      blocks.push(block);
    }
    return blocks;
  }

  function Ki(S) {
    const result = [];

    for (let i = 0; i < S; i++) {
      const value = (2 * 16 + i) % S;
      result.push(value);
    }

    return result;
  }

  function splitEachBlockInHalf(blocks) {
    return blocks.map((block) => {
      const halfLength = Math.floor(block.length / 2);
      return [block.slice(0, halfLength), block.slice(halfLength)];
    });
  }

  function festelLogic() {
    const S = +inputNumber;
    const inputSplit = splitBits(binaryString.replace(/\s+/g, ""), S);
    let elementsKi =
      ownKeys && ownKeys.trim() !== "" ? ownKeys.split(",").map(Number) : Ki(S);
    const steps = splitEachBlockInHalf(inputSplit);

    const elementsKiReversed = [...elementsKi].reverse();

    const newRes = steps.map((elem, i) => {
      const F_arr = [];
      const Ln_arr = [elem[0]];
      const Rn_arr = [elem[1]];

      let obj;
      if (+mode == 1) {
        elementsKi.map((Ki, j) => {
          if (elementsKi.length > j + 1) {
            Rn_arr.push(Ln_arr[j]);
            F_arr.push(F(Ln_arr[j], Ki));
            Ln_arr.push(XOR(F_arr[j], Rn_arr[j]));
            return undefined;
          }
          Ln_arr.push(Ln_arr[j]);
          F_arr.push(F(Ln_arr[j], Ki));
          Rn_arr.push(XOR(F_arr[j], Rn_arr[j]));
        });

        obj = {
          Ki: elementsKi,
          F: "XOR",
          F_value: F_arr,
          Ln: Ln_arr,
          Rn: Rn_arr,
          number: i,
          type: "Шифрування",
        };
      } else {
        elementsKiReversed.map((Ki, j) => {
          if (elementsKiReversed.length > j + 1) {
            Rn_arr.push(Ln_arr[j]);
            if (i == 1) {
            }
            F_arr.push(F(Ln_arr[j], Ki));
            Ln_arr.push(XOR(F_arr[j], Rn_arr[j]));
            return undefined;
          }
          Ln_arr.push(Ln_arr[j]);
          F_arr.push(F(Ln_arr[j], Ki));
          Rn_arr.push(XOR(F_arr[j], Rn_arr[j]));
        });

        obj = {
          Ki: elementsKiReversed,
          F: "XOR",
          F_value: F_arr,
          Ln: Ln_arr,
          Rn: Rn_arr,
          number: i,
          type: "Розшифрування",
        };
      }
      return obj;
    });
    setRes(newRes);

    setItems(
      newRes.map((resItem, i) => (
        <div style={{ display: "flex", justifyContent: "center" }} key={i}>
          <FeistelSvgGenerator elem={resItem} />
        </div>
      ))
    );

    const result = newRes
      .map((obj) => {
        const lastLn = obj.Ln[obj.Ln.length - 1];
        const lastRn = obj.Rn[obj.Rn.length - 1];
        return `${lastLn}${lastRn}`;
      })
      .join("");

    setFinalString(result);
  }

  const handleBuildSvg = () => {
    const isBinaryStringValid =
      typeof binaryString === "string" &&
      /^[01]+$/.test(binaryString.replace(/\s+/g, ""));

    if (!isBinaryStringValid) {
      toast({
        title: "Помилка",
        description: "Повідомлення повинне містити лише числа 0 та 1",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      return;
    }

    let isInputNumberValid =
      typeof +inputNumber === "number" &&
      Number.isInteger(+inputNumber) &&
      +inputNumber >= 0;

    if (+inputNumber < 2) isInputNumberValid = false;

    if (!isInputNumberValid) {
      toast({
        title: "Помилка",
        description:
          "Розмір блоку повинен бути цілим, не дробовим і не від’ємним числом. Або некоректне значення розміру блоку.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      return;
    }

    let areOwnKeysValid = true;
    const numbersArray = ownKeys.split(",").map(Number);
    if (ownKeys && Array.isArray(numbersArray) && numbersArray.length > 0) {
      areOwnKeysValid = numbersArray.every(
        (key) => typeof key === "number" && Number.isInteger(key) && key > 0
      );
    }
    if (ownKeys && numbersArray.length != +inputNumber) {
      areOwnKeysValid = false;
    }

    if (!areOwnKeysValid) {
      toast({
        title: "Помилка",
        description:
          "Ключі повинні бути лише додатнімм цілимм числами. Кількість ключів повинно складатись з кількості елементів, рівних розміру одного блоку",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });

      return;
    }

    festelLogic();
  };

  const handleClick = () => {
    setRes([]);
    setFinalString("");
    setItems([]);
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(finalString)
      .then(() => {
        toast({
          title: "Скопійовано!",
          description:
            "Результат шифрування успішно скопійовано в буфер обміну.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "bottom-left",
        });
      })
      .catch(() => {
        toast({
          title: "Помилка",
          description: "Не вдалося скопіювати результат.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom-left",
        });
      });
  };

  return (
    <ChakraProvider>
      <Box p={5}>
        <Stack spacing={4}>
          <Heading mb={5} textAlign="center">
            Блокове кодування за алгоритмом шифрування на основі мережі Фейстеля
          </Heading>
          <Input
            value={binaryString}
            onChange={(e) => setBinaryString(e.target.value)}
            placeholder="Введіть 2-йковий код,який потрібно зашифрувати (наприклад, 110010)"
          />
          <Input
            value={inputNumber}
            onChange={(e) => setInputNumber(e.target.value)}
            placeholder="Введіть розмір блоку (наприклад, 8)"
          />
          <Input
            value={ownKeys}
            onChange={(e) => setOwnKeys(e.target.value)}
            placeholder="Введіть власні ключі через кому, якщо не заповнювати то буде розраховано динамічно за формулою 2*16+imod8"
          />
          <Select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            placeholder="Виберіть режим"
            colorScheme="teal"
          >
            <option value="1">Шифрування</option>
            <option value="2">Розшифрування</option>
          </Select>
          <Button onClick={handleBuildSvg} mt={2} colorScheme="teal">
            Зашифрувати/Розшифрувати
          </Button>
          {res.length && (
            <Button
              onClick={handleClick}
              size="sm"
              colorScheme="red"
              variant="solid"
            >
              Очистити зображення
            </Button>
          )}
          {res && items}
          {res.length > 0 && (
            <Box
              p={4}
              borderRadius="lg"
              textAlign="center"
              bg="gray.100"
              transition="0.2s ease"
              overflow="hidden" // Ховаємо надлишки
            >
              <Text fontSize="3xl" fontWeight="bold" color="blue.600">
                Результат {res.type}:
              </Text>
              <Box
                fontSize="3xl"
                color="red.500"
                fontWeight="bold"
                transition="transform 0.2s ease"
                _hover={{
                  transform: "scale(1.1)", // Анімація з масштабом
                }}
                onClick={handleCopy}
                cursor="pointer"
              >
                {finalString}
              </Box>
            </Box>
          )}
        </Stack>
      </Box>
    </ChakraProvider>
  );
};
