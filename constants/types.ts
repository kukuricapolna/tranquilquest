export type Addiction = {
  addiction: string;
  id: number;
  started: Date;
};

export type DbData = {
  addictions: Addiction[];
};

/*
// const { data, refetch } = useQuery<Addictions[] | unknown>({
//   queryKey: ["userAddictions"],
//   queryFn: async (): Promise<Addictions[] | unknown> => {
//     const db = await SQLite.openDatabaseAsync("addictions.db");
//     const newStatement = await db.prepareAsync(`SELECT * FROM addictions`);
//     const result = newStatement.executeAsync(null);
//     const allRows = (await result).getAllAsync();
//     (await allRows).map((x) => console.log(`data ${JSON.stringify(x)}`));
//     await newStatement.finalizeAsync();
//     return allRows;
//   },
// });
*/

//const [addictions, setAddictions] = useState<Addictions[] | null>(null);
// const [selectedAddiction, setSelectedAddiction] = useState("");
// useEffect(() => {
//   const getAll = async () => {
//     const all: Addictions[] = await getAllAddictions();
//     setAddictions(all);
//   };
//   getAll();
// }, []);

// const newStatement = await db.prepareAsync(
//   `INSERT INTO addictions (addiction, started) VALUES ($addiction, datetime('now'))`,
// );
// await newStatement.executeAsync({ $addiction: addiction });
// await newStatement.finalizeAsync();
