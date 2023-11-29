import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, IconButton } from "@chakra-ui/react";

export default function Paginate({ questionsPerPage, totalQuestions, nextPage, checkTheAnswer }) {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalQuestions / questionsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="pagination-container">
            <Button onClick={checkTheAnswer}> Valider</Button>
            <IconButton
                icon={<ChevronDownIcon />}
                onClick={nextPage} />
        </div>
    )
}
