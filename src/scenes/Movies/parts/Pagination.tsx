import { Button } from "../../../components/ui/elements/Button";
import { Container } from "../../../components/layout/Containers";
import { useMoviesContext } from "../../../context/MoviesParamsContext";

export const Pagination = () => {
    const { searchParams, updateSearchParams, totalResults} = useMoviesContext();  
    const pageParam = searchParams?.get("page");
    const currentPage = pageParam ? parseInt(pageParam) : 1;
    
    const pagesTotal = totalResults ? Math.round(totalResults / 20) : 0;

    const nextPage = () => {
        if (!totalResults || currentPage < totalResults  ) {
            var newPage = currentPage + 1;
            const newParams = new URLSearchParams(searchParams);
    
            newParams.set("page", String(newPage))
            updateSearchParams(newParams)
        }
    };

    const prevPage = () => {     
        if (currentPage > 1) {
            var newPage = currentPage - 1;
            const newParams = new URLSearchParams(searchParams);
    
            newParams.set("page", String(newPage))
            updateSearchParams(newParams)
        }
    };

    return (
        <Container $direction="row" $justify="center" $margin="40px 0">
            <Button onClick={prevPage}
                $variant="filled"
                $color="text"
                $rounded="5px"
                $size="md"
                $weight="700"
                $inactive={currentPage < 2 ? "true" : "false"}
            ><span>Prev</span></Button>
            <p style={{margin: "10px 20px", fontSize: "34px", fontWeight: "700"}}>{currentPage} {pagesTotal < 1000 && `/ ${pagesTotal}`}</p>
            <Button
                onClick={nextPage}
                $variant="filled"
                $color="text"
                $rounded="5px"
                $size="md"
                $weight="700"
                $inactive={totalResults ? (currentPage < pagesTotal ? "false" : "true") : "false"}

            ><span>Next</span></Button>
        </Container>
    );
}