import { useState, useEffect } from "react";

export default function Overview(): JSX.Element {
   const [text, setText] = useState<null | string>(null);

   useEffect(() => {
      setText("Overview component work!");
      return () => {};
   }, []);

   return (
      <div>
         <p>{text}</p>
      </div>
   );
}
