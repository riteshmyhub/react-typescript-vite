import { useState, useEffect } from "react";

export default function Home(): JSX.Element {
   const [text, setText] = useState<null | string>(null);

   useEffect(() => {
      setText("Home component work!");
      return () => {};
   }, []);

   return (
      <div>
         <p>{text}</p>
      </div>
   );
}
