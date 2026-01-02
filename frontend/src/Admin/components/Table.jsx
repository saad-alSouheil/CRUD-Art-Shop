import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function BasicTable({ data, columns, rows }) {
    return (
        <TableContainer component={Paper} className="table">
            <Table>
                <TableHead>
                    <TableRow sx={{ bgcolor: "#eee" }}>
                        {columns.map((col) => (
                            <TableCell key={col.field} align="center" className="headCell">
                                {col.header}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {data.slice(0, rows).map((row) => (
                    <TableRow key={row.id}>
                        {columns.map((col) => (
                        <TableCell key={col.field} className="tableCell">
                            {col.render? col.render(row): row[col.field]}
                        </TableCell>
                        ))}
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default BasicTable;
