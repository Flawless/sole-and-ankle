import React from 'react';
import styled, {css} from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'


      if (variant === 'on-sale')
          <Label>Sale</Label>
      else if (variant === 'new-release')
          <Label>New Release!</Label>

    const labeltext = variant === 'on-sale' ? 'Sale' : 'New release!'

    const displaySale = variant === 'on-sale'

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price show={true} lineThrough={displaySale}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          <Price color={COLORS.primary} show={displaySale}>{formatPrice(salePrice)}</Price>
        </Row>
      <Label variant={variant}>
      {labeltext}
      </Label>
      </Wrapper>
    </Link>
  );
};

const variantStyles = (variant = 'default') =>
    ({
        default: css`
            display: none;
        `,
        'new-release': css`
            background-color: ${COLORS.secondary};
        `,
        'on-sale': css`
            background-color: ${COLORS.primary};
        `,
    }[variant]);

const Label = styled.div`
    padding: 10px;
    border-radius: 2px;
    color: ${COLORS.white};
    font-weight: 700;
    position: absolute;
    top: 12px;
    right: -4px;
    ${ props => variantStyles(props.variant)};
`;

const Link = styled.a`
    flex: 1 1 340px;
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`
    position: relative;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
    width: 100%;
`;

const Row = styled.div`
  font-size: 1rem;
    display: flex;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
    color: ${ props => props.color };
    text-decoration: ${ props => props.lineThrough ? 'line-through' : 'inherit'};
    display: ${ props => props.show ? 'block' : 'none'};
    margin-left: auto;
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
