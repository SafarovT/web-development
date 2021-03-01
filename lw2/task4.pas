PROGRAM GetQueryString(INPUT, OUTPUT);
USES
  DOS;

FUNCTION GetQueryStringParameter(Key: STRING): STRING;  
VAR
  QueryString, Window, POut: STRING;
  F1: TEXT;
  Ch: CHAR;  
  
BEGIN
  QueryString := GetEnv('QUERY_STRING');
  REWRITE(F1);
  WRITELN(F1, QueryString);
  RESET(F1);
  Window := '';
  POut := '';
  WHILE NOT EOLN(F1)                                                                                    
  DO
    BEGIN
      READ(F1, Ch);
      IF Ch <> '&'
      THEN
        BEGIN
          Window := Window + Ch;
          IF Window = (Key + '=')
          THEN
            BEGIN
              IF NOT  EOLN(F1) AND (Ch <> '&')
              THEN
                READ(F1, Ch);
              WHILE (Ch <> '&') AND NOT EOLN(F1)
              DO
                BEGIN
                  POut := POut + Ch;
                  READ(F1, Ch)
                END;
              IF EOLN(F1)
              THEN
                POut := POut + Ch 
            END
        END
      ELSE
        Window := ''  
    END;
  GetQueryStringParameter := POut   
END;
  
BEGIN
  WRITELN('Content-Type: text/plain');
  WRITELN;
  WRITELN('Name = ', GetQueryStringParameter('name'));
  WRITELN('Age = ', GetQueryStringParameter('age'));
  WRITELN('Class = ', GetQueryStringParameter('class'));  
  WRITELN('Hair color = ', GetQueryStringParameter('hair_color'));
  WRITELN('Thanks = ', GetQueryStringParameter('thanks'))      
END.
