import { ITableProps } from 'types';
import { Table as AntTable, Spin } from 'antd';

export const Table: React.FC<ITableProps> = ({
  columns,
  dataSource,
  containerClassName,
  tableClassName,
  pagination,
  loading = false,
  locale,
  onRowClick,
  ...rest
}) => {
  return (
    <div className={`fa-table ${containerClassName ? containerClassName : ''}`}>
      <AntTable
        columns={columns}
        dataSource={dataSource.map((info: Object, key: number) => ({
          ...info,
          key,
        }))}
        pagination={pagination || false}
        className={tableClassName}
        locale={locale}
        loading={{
          spinning: loading,
          indicator: <Spin size='small' />,
        }}
        onRow={(record, index) => {
          return {
            onClick: () => {
              if (onRowClick) onRowClick(record);
            },
          };
        }}
        {...rest}
      />
    </div>
  );
};
