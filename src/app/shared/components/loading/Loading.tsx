import { useState, useEffect } from "react";

export default function Loading(): JSX.Element {
   const [text, setText] = useState<null | string>(null);

   useEffect(() => {
      setText("Loading component work!");
      return () => {};
   }, []);

   return (
      <div>
         <p>{text}</p>
      </div>
   );
}
