import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import CardsCarrousel from '../../CardsCarrousel';
import { ReactComponent as ProfitLossIconDark } from '../../../assets/images/finance/Profit-loss-icn-dark.svg';
import { ReactComponent as ProfitLossIconLight } from '../../../assets/images/finance/Profit-loss-icn-light.svg';
import { ReactComponent as ExpenseIcon } from '../../../assets/images/finance/Expense-icn.svg';
import { ReactComponent as CropIcon } from '../../../assets/images/finance/Crop-icn.svg';
import styles from './styles.module.scss';
import { Semibold, Text } from '../../Typography';
import { BsChevronRight } from 'react-icons/bs';
import clsx from 'clsx';

ChartJS.register(ArcElement, Tooltip);

const ShadowPlugin = {
  beforeDraw: (chart) => {
    const { ctx } = chart;
    ctx.shadowColor = '#FFEFCF';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 4;
  },
};

const FinancesCarrousel = ({
  totalExpense,
  totalRevenue,
  labourExpense,
  otherExpense,
  estimatedRevenue,
  currencySymbol,
}) => {
  const expenseChartData = {
    labels: ['Total other', 'Total labour'],
    datasets: [
      {
        data: [11500, 21523],
        backgroundColor: ['#FFB800', '#AA5F04'],
      },
    ],
  };

  const cards = [
    {
      id: 'profit-loss',
      inactiveBackgroundColor: 'var(--teal700)',
      inactiveIcon: <ProfitLossIconDark />,
      activeContent: (
        <div className={clsx([styles.cardContent, styles.profitLossCardContent])}>
          <div className={styles.revenueExpensesContainer}>
            <div className={styles.revenueContainer}>
              <div>
                <Text className={styles.revenueTitle}>Total revenue</Text>
                <p className={clsx([styles.stat, styles.revenueStat])}>
                  {currencySymbol}
                  {totalRevenue}
                </p>
              </div>
              <BsChevronRight />
            </div>
            <div className={styles.expenseContainer}>
              <Text className={styles.expenseTitle}>Total expenses</Text>
              <p className={clsx([styles.stat, styles.expenseStat])}>
                {currencySymbol}
                {totalExpense}
              </p>
            </div>
          </div>
          <div className={styles.profitLossSummaryContainer}>
            <ProfitLossIconLight />
            <Text className={styles.profitLossTitle}>Profit / Loss</Text>
            <p className={clsx([styles.stat, styles.profitLossStat])}>
              {currencySymbol}
              {totalRevenue - totalExpense}
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'expenses',
      inactiveBackgroundColor: 'var(--white)',
      inactiveIcon: <ExpenseIcon />,
      activeContent: (
        <div className={styles.cardContent}>
          <div className={styles.totalExpensesContainer}>
            <Semibold className={styles.totalExpensesTitle}>Total expenses</Semibold>
            <div className={styles.expensesChartContainer}>
              <div className={styles.expensesChart}>
                <Doughnut
                  data={expenseChartData}
                  options={{ cutout: '70%', borderWidth: 0 }}
                  plugins={[ShadowPlugin]}
                />
              </div>
              <div className={styles.totalExpensesStatContainer}>
                <p className={clsx([styles.stat, styles.totalExpensesStat])}>
                  {currencySymbol}
                  {totalExpense}
                </p>
              </div>
            </div>
          </div>
          <div className={styles.expensesStatsContainer}>
            <div className={styles.labourExpensesContainer}>
              <div>
                <Text className={styles.labourExpensesTitle}>Total labour</Text>
                <p className={clsx([styles.stat, styles.labourExpensesStat])}>
                  {currencySymbol}
                  {labourExpense}
                </p>
              </div>
              <BsChevronRight />
            </div>
            <div className={styles.otherExpensesContainer}>
              <div>
                <Text className={styles.otherExpensesTitle}>Total other</Text>
                <p className={clsx([styles.stat, styles.otherExpensesStat])}>
                  {currencySymbol}
                  {otherExpense}
                </p>
              </div>
              <BsChevronRight />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'crop-revenue',
      inactiveBackgroundColor: 'var(--green400)',
      inactiveIcon: <CropIcon />,
      activeContent: (
        <div className={clsx([styles.cardContent, styles.estimatedRevenueCardContent])}>
          <CropIcon width={56} height={56} />
          <div className={styles.estimatedRevenueContainer}>
            <div>
              <Text className={styles.estimatedRevenueTitle}>Estimated harvest revenue</Text>
              <p className={styles.stat}>
                {currencySymbol}
                {estimatedRevenue}
              </p>
            </div>
            <BsChevronRight />
          </div>
        </div>
      ),
    },
  ];

  return <CardsCarrousel cards={cards} />;
};

export default FinancesCarrousel;
