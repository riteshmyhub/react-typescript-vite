import JsonFormatter from "react-json-formatter";

export default function JsonViewer({ code }: { code: any }): JSX.Element {
   const jsonStyle = {
      propertyStyle: { color: "#3178C6" },
      bracketStyle: { color: "#3178C6" },
      stringStyle: { color: "black" },
      numberStyle: { color: "green" },
      booleanStyle: { color: "darkorange" },
      braceStyle: { color: "#FC7D13" },
      style: { fontSize: "20px" },
      // bracketStyle
   };
   return (
      <div>
         <JsonFormatter json={code} tabWith={6} jsonStyle={jsonStyle} />
      </div>
   );
}
