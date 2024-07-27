export default function errorHandler(handler: Function) {
  return (msgOffset: string, payload: any, callback: Function) => {
    handler(msgOffset, payload, callback).catch((err: Error) =>
      console.log(err)
    );
  };
}
