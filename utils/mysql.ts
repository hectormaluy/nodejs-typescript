
export function ejecutarQuery(con: any, sql: string) {
 return new Promise((resolve, reject) => {
   con.connect((err: any) => {
     if (err) reject(err);
     con.query(sql, function (error: any, result:any) {
       con.end();
       if (error) reject (error); 
       resolve(result);
     });
   });
 });
}