const SpecificationTable = ({ data }: any) => {
  return (
    <table className="table-auto w-1/2 border-collapse">
      <tbody>
        {[...Array(10)].map((_, i) => (
          <TableRow
            key={i}
            title="Title"
            desc="Description"
            even={i % 2 === 0}
          />
        ))}
      </tbody>
    </table>
  )
}

export default SpecificationTable

const TableRow = ({ title, desc, even }: any) => {
  return (
    <tr className={`${even ? 'bg-[#fafbfd]' : ''}`}>
      <td className="border border-gray-100 py-2 px-3 text-sm text-gray-500">
        {title}
      </td>
      <td className="border border-gray-100 py-2 px-3 text-sm text-gray-500">
        {desc}
      </td>
    </tr>
  )
}
