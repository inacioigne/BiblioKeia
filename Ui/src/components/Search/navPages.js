import { Box, Pagination } from "@mui/material";
import { useSearch } from "src/providers/search"

export default function NavPages({query}) {

    const { getData, numFound, setNumFound, items, setItems, filter, page, setPage } = useSearch()

    const handlePagination = (e, p) => {
      console.log("P:", filter);
        if (p == 1) {
          setPage(0);
          getData(query.field, query.term, 0, filter);
        } else {
          let c = p * 10 - 9;
          setPage(c);
          getData(query.field, query.term, c, filter);
          //console.log("P:", c);
        }
      };

  return (
    <Box my={2}>
      <Pagination
        count={Math.ceil(numFound / 10)}
        color="primary"
        onChange={handlePagination}
      />
      
    </Box>
  );
}
