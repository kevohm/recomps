import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

export const Pagination = ({ 
  currentPage = 1, 
  totalPages = 10, 
  onPageChange = () => {},
  showFirstLast = true,
  maxVisiblePages = 5 
}) => {
  const [hoveredPage, setHoveredPage] = useState(null);

  const getVisiblePages = () => {
    const pages = [];
    const half = Math.floor(maxVisiblePages / 2);
    
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxVisiblePages - 1);
    
    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  const visiblePages = getVisiblePages();
  const showStartEllipsis = visiblePages[0] > 2;
  const showEndEllipsis = visiblePages[visiblePages.length - 1] < totalPages - 1;

  const PageButton = ({ page, isActive = false, isEllipsis = false, children }) => (
    <button
      onClick={() => !isEllipsis && onPageChange(page)}
      onMouseEnter={() => setHoveredPage(page)}
      onMouseLeave={() => setHoveredPage(null)}
      disabled={isEllipsis}
      className={`
        relative min-w-[40px] h-10 px-3 rounded-lg font-medium text-sm transition-all duration-300 ease-out
        ${isActive 
          ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25 scale-105' 
          : isEllipsis
            ? 'text-gray-400 cursor-default'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 hover:scale-105 active:scale-95'
        }
        ${hoveredPage === page && !isActive && !isEllipsis ? 'bg-blue-50' : ''}
        disabled:cursor-default disabled:transform-none
      `}
    >
      {isActive && (
        <div className="absolute inset-0 bg-blue-400 rounded-lg animate-pulse opacity-20" />
      )}
      <span className="relative z-10">{children || page}</span>
    </button>
  );

  const NavButton = ({ direction, disabled, onClick, children }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        flex items-center justify-center w-10 h-10 rounded-lg font-medium text-sm transition-all duration-300 ease-out
        ${disabled 
          ? 'text-gray-300 cursor-not-allowed bg-gray-50' 
          : 'text-gray-600 hover:text-white hover:bg-blue-500 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 active:scale-95'
        }
      `}
    >
      {children}
    </button>
  );

  return (
    <div className="flex items-center justify-center space-x-2 py-8">
      {/* First page button */}
      {showFirstLast && currentPage > 1 && (
        <NavButton
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          <ChevronLeft className="w-4 h-4 -ml-2" />
        </NavButton>
      )}

      {/* Previous button */}
      <NavButton
        direction="prev"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="w-4 h-4" />
      </NavButton>

      {/* First page */}
      {showStartEllipsis && (
        <>
          <PageButton page={1} isActive={currentPage === 1} />
          <PageButton isEllipsis>
            <MoreHorizontal className="w-4 h-4" />
          </PageButton>
        </>
      )}

      {/* Visible page numbers */}
      {visiblePages.map(page => (
        <PageButton
          key={page}
          page={page}
          isActive={currentPage === page}
        />
      ))}

      {/* Last page */}
      {showEndEllipsis && (
        <>
          <PageButton isEllipsis>
            <MoreHorizontal className="w-4 h-4" />
          </PageButton>
          <PageButton page={totalPages} isActive={currentPage === totalPages} />
        </>
      )}

      {/* Next button */}
      <NavButton
        direction="next"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="w-4 h-4" />
      </NavButton>

      {/* Last page button */}
      {showFirstLast && currentPage < totalPages && (
        <NavButton
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="w-4 h-4 mr-1" />
          <ChevronRight className="w-4 h-4 -ml-2" />
        </NavButton>
      )}
    </div>
  );
};