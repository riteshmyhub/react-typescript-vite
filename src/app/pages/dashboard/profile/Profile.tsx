import { useState, useEffect } from "react";

export default function Profile(): JSX.Element {
   const [text, setText] = useState<null | string>(null);

   useEffect(() => {
      setText("Profile component work!");
      return () => {};
   }, []);

   return (
      <div>
         <p>{text}</p>
      </div>
   );
}
