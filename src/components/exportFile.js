const columns = ["Raia", "Número de Peito", "Tempo"];

export default function exportCSV(data) {

    const csvContent = [columns.join(',')];
    data.forEach(obj => {
        const row = columns.map(col => obj[col]);
        csvContent.push(row.join(','));
    });
    const blob = new Blob([csvContent.join('\n')], { type: 'text/csv' });


    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'export.csv';

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
}