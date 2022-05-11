import { createContext, useState } from "react";

export const InputSum = createContext();

export const InputSumProvider = ({ children }) => {
  const [inputSum, setInputSum] = useState(1500);
  return (
    <InputSum.Provider
      value={{
        inputSum,
        setInputSum
      }}
    >
      {children}
    </InputSum.Provider>
  );
};

export const Records = createContext();

export const RecordsProvider = ({ children }) => {
  const [records, setRecords] = useState([]);

  const updateRecord = (activityType, recordData) => {
    const newRecord = makeRecord(activityType, recordData);
    setRecords([newRecord, ...records]);
  };

  const makeRecord = (activityType, recordData = null) => {
    switch (activityType) {
      case "purchase":
        return `${recordData}를 구매했습니다.`;
      case "outOfStock":
        return `${recordData}의 재고가 없습니다.`;
      case "lackOfMoney":
        return `투입 금액이 부족합니다.`;
      case "inputMoney":
        return `${recordData.toLocaleString()}원을 투입했습니다.`;
      default:
        console.log("invalid activity type");
    }
  };

  return (
    <Records.Provider
      value={{
        records,
        updateRecord
      }}
    >
      {children}
    </Records.Provider>
  );
};
