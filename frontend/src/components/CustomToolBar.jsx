import { GridToolbarColumnsButton, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid'

function CustomToolBar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport 
        csvOptions={{
          fileName: 'MedicalFile',
          delimiter: ',',
          utf8WithBom: true,
          allColumns: true,
        }}/>
        <GridToolbarFilterButton />
        <GridToolbarColumnsButton />
    </GridToolbarContainer>
  )
}

export default CustomToolBar
